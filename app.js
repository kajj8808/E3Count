const Discord = require("discord.js");
const schedule = require("node-schedule");
const { webHook_id, webHook_token } = require("./config.json");

const hook = new Discord.WebhookClient(webHook_id, webHook_token);

const E3Day = new Date(2021, 6 - 1, 12, 0, 0, 0);

const E3Counter = () => {
  const days = getDays();
  hook.send(msgEmbed(days));
};

const getDays = () => {
  const now = new Date();
  return Math.floor((E3Day.getTime() - now.getTime()) / 86400000);
};

const msgEmbed = (days) =>
  new Discord.MessageEmbed()
    .setColor("#ff3838")
    .setTitle("E3 site")
    .setURL("https://e3expo.com/")
    .setAuthor("E3 Count Bot", "", "https://github.com/kajj8808/E3Count")
    .setDescription(days > 0 || days === 0 ? `Day Count : -${days}` : `June 12 - 15 ,2021`)
    .addFields(
      { name: "nintendo", value: "0", inline: true },
      { name: "squareEnix", value: "0", inline: true },
      { name: "Ubisoft", value: "6-13 04 (KST)", inline: true },
      { name: "PC Games Show", value: "6-13 showcase", inline: true },
      { name: "future Games Show", value: "6-13 showcase", inline: true },
      { name: "microsoft & Bethesda ", value: "6-14 02 (KST)", inline: true },
      { name: "Warner Bros", value: "0", inline: true }
    )
    .setThumbnail("https://e3expo.com/wp-content/uploads/2020/12/E3Logo21.png");

schedule.scheduleJob("0 0 0 * * *", () => E3Counter());
