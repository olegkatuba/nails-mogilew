import TelegramBotApi from "node-telegram-bot-api";
import config from "./config";
import CommentController from "../db/controllers/comment";
import TelegramRecipientsController from "../db/controllers/telegramRecipients";

const APPROVE = "approve";
const REJECT = "reject";

class TelegramBotController {
  constructor() {
    this.bot = new TelegramBotApi(config.token, { polling: true });

    this.bot.onText(/\/start_send_messages/, async msg => {
      console.log(msg);
      const sender = msg.from;

      try {
        const recipients = await TelegramRecipientsController.getTelegramRecipients();
        const existingRecipient = recipients.find(i => i.id === sender.id);
        if (!existingRecipient) {
          const userProfilePhotos = await this.bot.getUserProfilePhotos(
            sender.id
          );
          let photoUrl;
          if (userProfilePhotos.photos.length) {
            const file = await this.bot.getFile(
              userProfilePhotos.photos[0][0].file_id
            );
            photoUrl = `https://api.telegram.org/file/bot${config.token}/${
              file.file_path
            }`;
          }
          await TelegramRecipientsController.addTelegramRecipient({
            id: sender.id,
            firstName: sender.first_name,
            lastName: sender.last_name,
            photoUrl
          });
          return this.bot.sendMessage(sender.id, "Subscription successful");
        }
        return this.bot.sendMessage(
          sender.id,
          "You are already subscribed. Send /stop_send_messages to unsubscribe"
        );
      } catch (err) {
        console.error(err);
        this.bot.sendMessage(
          sender.id,
          `Something went wrong:\n\n${JSON.stringify(err)}`
        );
      }
    });

    this.bot.onText(/\/stop_send_messages/, msg => {
      const sender = msg.from;
      TelegramRecipientsController.getTelegramRecipients()
        .then(recipients => {
          const existingRecipient = recipients.find(i => i.id === sender.id);
          if (existingRecipient) {
            return TelegramRecipientsController.deleteTelegramRecipient(
              existingRecipient.id
            ).then(() => this.bot.sendMessage(sender.id, "Unsubscribed"));
          }
          return this.bot.sendMessage(
            sender.id,
            "You are unsubscribed. Send /start_send_messages to subscribe"
          );
        })
        .catch(err => {
          console.error(err);
          this.bot.sendMessage(
            sender.id,
            `Something went wrong:\n\n${JSON.stringify(err)}`
          );
        });
    });

    this.bot.on("callback_query", async msg => {
      const answer = msg.data.split("|");
      const commentId = answer[0];
      const button = answer[1];

      const comment = await CommentController.getComment(commentId);

      if (!comment) {
        await this.bot.answerCallbackQuery(msg.id, "Already rejected", true);
        return this.bot.sendMessage(msg.from.id, "❌");
      }

      if (button === APPROVE) {
        this.bot.sendMessage(msg.from.id, "✅");
        if (comment.approved) {
          await this.bot.answerCallbackQuery(msg.id, "Already approved", true);
        } else {
          await this.bot.answerCallbackQuery(msg.id, "Approved", true);
          await CommentController.approve(commentId);
        }
      } else if (button === REJECT) {
        await this.bot.sendMessage(msg.from.id, "❌");
        await this.bot.answerCallbackQuery(msg.id, "Rejected", true);
        await CommentController.deleteComment(commentId);
      }
    });
  }

  sendReservationMessage({
    name = "",
    tel = "",
    date = "",
    time = "",
    comment = "",
    know = ""
  }) {
    return TelegramRecipientsController.getTelegramRecipients().then(
      recipients =>
        Promise.all(
          recipients.map(recipient =>
            this.bot.sendMessage(
              recipient.id,
              `${name} wants manicure at ${date}, ${time}.
              \nCall her: ${tel}
              \n${comment && `Comment:\n\n${comment}`}
              \n${comment && `Know from:\n\n${know}`}`
            )
          )
        )
    );
  }

  sendNewCommentMessage({ _id = 0, author = "", text = "" }) {
    const options = {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Approve ✅", callback_data: `${_id}|${APPROVE}` }],
          [{ text: "Reject ❌", callback_data: `${_id}|${REJECT}` }]
        ],
        parse_mode: "Markdown"
      })
    };
    return TelegramRecipientsController.getTelegramRecipients().then(
      recipients =>
        Promise.all(
          recipients.map(recipient =>
            this.bot.sendMessage(
              recipient.id,
              `${author} add new comment:\n\n${text}`,
              options
            )
          )
        )
    );
  }
}

export default new TelegramBotController();
