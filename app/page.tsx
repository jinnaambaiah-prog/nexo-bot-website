'use client';

import Image from "next/image";
import { useState } from "react";

interface Command {
  name: string;
  usage: string;
}

interface Category {
  icon: string;
  name: string;
  count: number;
  commands: Command[];
}

const categories: Category[] = [
  {
    icon: "🎵",
    name: "Music",
    count: 20,
    commands: [
      { name: "play", usage: "Play songs from YouTube/Spotify" },
      { name: "skip", usage: "Skip current track" },
      { name: "queue", usage: "View music queue" },
      { name: "lyrics", usage: "Get song lyrics" },
      { name: "filter", usage: "Apply audio filters" },
      { name: "pause", usage: "Pause the music" },
      { name: "resume", usage: "Resume the music" },
      { name: "stop", usage: "Stop the music" },
      { name: "volume", usage: "Adjust volume" },
      { name: "nowplaying", usage: "Show current track" },
      { name: "playlist", usage: "View playlists" },
      { name: "shuffle", usage: "Enable shuffle mode" },
      { name: "repeat", usage: "Set repeat mode" },
      { name: "seek", usage: "Seek to time in track" },
      { name: "bassboost", usage: "Apply bass boost effect" },
      { name: "treble", usage: "Boost treble" },
      { name: "nightcore", usage: "Apply nightcore effect" },
      { name: "vaporwave", usage: "Apply vaporwave effect" },
      { name: "slowmo", usage: "Slow down music" },
      { name: "reverb", usage: "Add reverb effect" },
    ]
  },
  {
    icon: "🛡️",
    name: "Moderation",
    count: 19,
    commands: [
      { name: "ban", usage: "Ban a user permanently" },
      { name: "kick", usage: "Kick a user from server" },
      { name: "warn", usage: "Warn a user" },
      { name: "mute", usage: "Mute a user" },
      { name: "purge", usage: "Bulk delete messages" },
      { name: "unban", usage: "Unban a user" },
      { name: "unmute", usage: "Unmute a user" },
      { name: "timeout", usage: "Timeout a user" },
      { name: "slowmode", usage: "Enable slowmode" },
      { name: "lock", usage: "Lock a channel" },
      { name: "unlock", usage: "Unlock a channel" },
      { name: "clear", usage: "Clear messages" },
      { name: "softban", usage: "Softban (ban and unban)" },
      { name: "tempban", usage: "Temporary ban" },
      { name: "tempmute", usage: "Temporary mute" },
      { name: "reason", usage: "Add ban reason" },
      { name: "warnings", usage: "View user warnings" },
      { name: "warnreset", usage: "Reset user warnings" },
      { name: "modlog", usage: "View mod action log" },
    ]
  },
  {
    icon: "🎉",
    name: "Fun",
    count: 22,
    commands: [
      { name: "meme", usage: "Get random memes" },
      { name: "dare", usage: "Truth or dare game" },
      { name: "ship", usage: "Ship two users" },
      { name: "hug", usage: "Send virtual hugs" },
      { name: "kiss", usage: "Send virtual kisses" },
      { name: "slap", usage: "Slap a user" },
      { name: "punch", usage: "Punch a user" },
      { name: "8ball", usage: "Magic 8 ball answer" },
      { name: "joke", usage: "Get random jokes" },
      { name: "quote", usage: "Get random quotes" },
      { name: "riddle", usage: "Get riddles" },
      { name: "dice", usage: "Roll dice" },
      { name: "coin", usage: "Flip a coin" },
      { name: "trivia", usage: "Trivia questions" },
      { name: "neverhaveiever", usage: "Never have I ever game" },
      { name: "wouldyourather", usage: "Would you rather game" },
      { name: "roast", usage: "Get a roast" },
      { name: "compliment", usage: "Get a compliment" },
      { name: "pickup", usage: "Get pickup lines" },
      { name: "cat", usage: "Get cat images" },
      { name: "dog", usage: "Get dog images" },
      { name: "duck", usage: "Get duck images" },
    ]
  },
  {
    icon: "⚙️",
    name: "Config",
    count: 13,
    commands: [
      { name: "musicsetup", usage: "Setup music channels" },
      { name: "ticketsetup", usage: "Configure support tickets" },
      { name: "welcomeset", usage: "Setup welcome messages" },
      { name: "loggingsetup", usage: "Configure logging" },
      { name: "preset", usage: "Choose music player style" },
      { name: "prefix", usage: "Set command prefix" },
      { name: "setlang", usage: "Set bot language" },
      { name: "setmodlog", usage: "Setup mod log channel" },
      { name: "setwelcome", usage: "Set welcome channel" },
      { name: "setlogs", usage: "Set logging channel" },
      { name: "autorolesetup", usage: "Setup auto roles" },
      { name: "ticketmessage", usage: "Configure ticket message" },
      { name: "resetconfig", usage: "Reset all config" },
    ]
  },
  {
    icon: "ℹ️",
    name: "Information",
    count: 20,
    commands: [
      { name: "help", usage: "Show all commands" },
      { name: "serverinfo", usage: "Server information" },
      { name: "userinfo", usage: "User information" },
      { name: "botinfo", usage: "Bot statistics" },
      { name: "rank", usage: "User ranking" },
      { name: "stats", usage: "User statistics" },
      { name: "avatar", usage: "Get user avatar" },
      { name: "banner", usage: "Get server banner" },
      { name: "uptime", usage: "Bot uptime" },
      { name: "ping", usage: "Bot latency" },
      { name: "about", usage: "About the bot" },
      { name: "changelog", usage: "View changelog" },
      { name: "version", usage: "Bot version" },
      { name: "premium", usage: "Premium info" },
      { name: "membercount", usage: "Server member count" },
      { name: "rolecount", usage: "Server role count" },
      { name: "channelcount", usage: "Server channel count" },
      { name: "activity", usage: "Member activity" },
      { name: "leaderboard", usage: "Server leaderboard" },
      { name: "roles", usage: "List server roles" },
    ]
  },
  {
    icon: "👑",
    name: "Owner",
    count: 20,
    commands: [
      { name: "backup", usage: "Server backup" },
      { name: "blacklist", usage: "Manage blacklists" },
      { name: "premium", usage: "Premium management" },
      { name: "reload", usage: "Reload commands" },
      { name: "serverlist", usage: "View bot servers" },
      { name: "eval", usage: "Evaluate code" },
      { name: "shutdown", usage: "Shutdown bot" },
      { name: "restart", usage: "Restart bot" },
      { name: "status", usage: "Set bot status" },
      { name: "maintenance", usage: "Enable maintenance" },
      { name: "announce", usage: "Make announcements" },
      { name: "kick-all", usage: "Kick all members" },
      { name: "ban-all", usage: "Ban all members" },
      { name: "logs", usage: "View bot logs" },
      { name: "stats", usage: "Bot statistics" },
      { name: "debug", usage: "Debug mode" },
      { name: "cleardb", usage: "Clear database" },
      { name: "restoredb", usage: "Restore database" },
      { name: "guild-list", usage: "List all guilds" },
      { name: "memberlist", usage: "List all members" },
    ]
  },
  {
    icon: "💰",
    name: "Economy",
    count: 2,
    commands: [
      { name: "balance", usage: "Check balance" },
      { name: "daily", usage: "Claim daily reward" },
    ]
  },
  {
    icon: "🎁",
    name: "Giveaway",
    count: 5,
    commands: [
      { name: "gstart", usage: "Start giveaway" },
      { name: "gend", usage: "End giveaway" },
      { name: "greroll", usage: "Reroll winner" },
      { name: "glist", usage: "List giveaways" },
      { name: "gcancel", usage: "Cancel giveaway" },
    ]
  },
  {
    icon: "🏷️",
    name: "Role",
    count: 9,
    commands: [
      { name: "autorole", usage: "Auto-assign roles" },
      { name: "rolesetup", usage: "Setup role reactions" },
      { name: "vip", usage: "VIP role management" },
      { name: "addrole", usage: "Add role to member" },
      { name: "removerole", usage: "Remove role from member" },
      { name: "rolemenu", usage: "Create role menu" },
      { name: "rolename", usage: "Rename a role" },
      { name: "rolecolor", usage: "Change role color" },
      { name: "delrole", usage: "Delete a role" },
    ]
  },
  {
    icon: "🤖",
    name: "Automod",
    count: 6,
    commands: [
      { name: "antilink", usage: "Block links" },
      { name: "antispam", usage: "Anti-spam protection" },
      { name: "antibadword", usage: "Filter bad words" },
      { name: "autoreact", usage: "Auto reactions" },
      { name: "antinuke", usage: "Anti-nuke protection" },
      { name: "antiraid", usage: "Anti-raid protection" },
    ]
  },
  {
    icon: "👋",
    name: "Welcome",
    count: 2,
    commands: [
      { name: "welcome", usage: "Welcome settings" },
      { name: "welcomemessage", usage: "Custom messages" },
    ]
  },
  {
    icon: "🔞",
    name: "Adult",
    count: 3,
    commands: [
      { name: "boobs", usage: "NSFW content" },
      { name: "pussy", usage: "NSFW content" },
      { name: "nsfw4k", usage: "NSFW content" },
    ]
  },
  {
    icon: "🎵",
    name: "Spotify",
    count: 5,
    commands: [
      { name: "splay", usage: "Play Spotify tracks" },
      { name: "splaylist", usage: "Play Spotify playlists" },
      { name: "sprofile", usage: "Spotify profile" },
      { name: "slink", usage: "Link Spotify account" },
      { name: "unlink", usage: "Unlink Spotify" },
    ]
  },
];

interface MenuItem {
  title: string;
  icon: string;
  description: string;
  details: string[];
}

const menuItems: Record<string, MenuItem[]> = {
  dashboard: [
    {
      title: "Statistics",
      icon: "📈",
      description: "View real-time statistics about your server",
      details: ["Member count tracking", "Message logs analysis", "Bot activity metrics", "User engagement analytics", "Guild growth trends", "Custom statistics"]
    },
    {
      title: "Music Controls",
      icon: "🎵",
      description: "Manage music playback settings",
      details: ["Queue management", "Playback controls", "Audio filters", "Volume adjustment", "Now playing display", "Playlist management"]
    },
    {
      title: "User Management",
      icon: "👥",
      description: "Monitor user activity and manage roles",
      details: ["Role assignment", "User permissions", "Activity tracking", "Ban/kick management", "User profiles", "Threat detection"]
    },
    {
      title: "Activity Feed",
      icon: "📊",
      description: "Comprehensive real-time activity log",
      details: ["Event logging", "Action history", "User actions", "Moderation events", "System notifications", "Export logs"]
    }
  ],
  settings: [
    {
      title: "Permissions",
      icon: "🔐",
      description: "Set granular permissions for user roles",
      details: ["Role-based access", "Command permissions", "Channel restrictions", "User restrictions", "Permission inheritance", "Custom rules"]
    },
    {
      title: "Toggles",
      icon: "🎚️",
      description: "Enable/disable features on-the-fly",
      details: ["Feature toggles", "Auto-features", "Safety features", "Notification settings", "Module management", "Quick presets"]
    },
    {
      title: "Command Config",
      icon: "📝",
      description: "Customize command behavior",
      details: ["Command aliases", "Prefix settings", "Response customization", "Cooldown configuration", "Error messages", "Help text customization"]
    },
    {
      title: "Preferences",
      icon: "🎛️",
      description: "Adjust general bot preferences",
      details: ["Language selection", "Timezone settings", "Notification preferences", "Theme selection", "Automation settings", "API keys"]
    }
  ],
  support: [
    {
      title: "Documentation",
      icon: "📚",
      description: "Comprehensive guides and tutorials",
      details: ["Getting started", "Command reference", "Setup guides", "Troubleshooting", "Video tutorials", "API documentation"]
    },
    {
      title: "Community Help",
      icon: "💬",
      description: "Get help from the community",
      details: ["Discord support server", "Community forums", "FAQ section", "Peer support", "Live chat", "Status page"]
    },
    {
      title: "Bug Reports",
      icon: "🐛",
      description: "Report bugs to our team",
      details: ["Bug tracker", "Report form", "Known issues", "Issue status", "Patch notes", "Change log"]
    },
    {
      title: "Feature Requests",
      icon: "💡",
      description: "Suggest and vote on features",
      details: ["Feature board", "Voting system", "Popular requests", "Roadmap", "Suggestion form", "Implementation status"]
    }
  ]
};

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState<string | null>(null);
  const addBotUrl = "https://discord.com/oauth2/authorize?client_id=1473745234017128622&permissions=8&scope=bot%20applications.commands";
  const supportServerUrl = "https://discord.gg/hPNruxcZFv";

  const activeCategory = categories.find(cat => cat.name === selectedCategory);

  return (
    <main className="min-h-screen px-6 py-8 text-white">
      <header className="mx-auto flex max-w-6xl flex-col gap-6">
        <nav className="flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-6 py-4 shadow-xl shadow-emerald-950/10 backdrop-blur-xl fade-in-down">
          <span className="text-xl font-semibold">Nexora</span>
          <div className="flex items-center gap-4 text-sm text-white">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#commands" className="hover:text-white transition">Commands</a>
            <a href="#menu" className="hover:text-white transition">Menu</a>
          </div>
        </nav>

        <section className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-2xl shadow-emerald-950/25 backdrop-blur-xl fade-in-up border-glow-effect">
          <div className="text-center">
            <div className="mx-auto mb-6 h-28 w-28 rounded-full border border-emerald-300/30 bg-emerald-950/20 p-3 shadow-xl shadow-emerald-950/20 sm:h-32 sm:w-32 float-animation">
              <Image src="/bot-pfp.svg" alt="Nexora Bot Profile" width={128} height={128} className="rounded-full rotate-animation" />
            </div>
            <p className="text-sm uppercase tracking-[0.4em] text-white neon-text fade-in-up">Nexora Bot</p>
            <h1 className="mt-6 text-5xl font-extrabold tracking-tight sm:text-6xl neon-text fade-in-up">Smart automation, friendly AI.</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white neon-text fade-in-up">
              Nexora helps your server with automations, moderation, custom replies, and task workflows all from one smart assistant.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href={addBotUrl} target="_blank" rel="noreferrer" className="rounded-full bg-emerald-400 px-8 py-3 text-sm font-semibold text-emerald-950 shadow-lg shadow-emerald-950/15 transition hover:bg-emerald-300 button-glow fade-in-up">Add Bot</a>
              <a href={supportServerUrl} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10 button-glow fade-in-up">Support</a>
              <a href="#commands" className="rounded-full bg-emerald-400 px-8 py-3 text-sm font-semibold text-emerald-950 shadow-lg shadow-emerald-950/15 transition hover:bg-emerald-300 button-glow fade-in-up">See Commands</a>
              <a href="#menu" className="rounded-full border border-white/10 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10 button-glow fade-in-up">View Menu</a>
            </div>
          </div>
        </section>
      </header>

      <section id="features" className="mx-auto mt-12 max-w-6xl space-y-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-emerald-950/10 backdrop-blur-xl transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-white/10 card-hover fade-in-up slide-in-left">
            <h2 className="text-2xl font-semibold">Smart Moderation</h2>
            <p className="mt-3 text-sm leading-6 text-white">
              Automatically moderate chats, block spam, and keep your community safe with custom rule sets.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-emerald-950/10 backdrop-blur-xl transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-white/10 card-hover fade-in-up">
            <h2 className="text-2xl font-semibold">Custom Commands</h2>
            <p className="mt-3 text-sm leading-6 text-white">
              Configure quick actions and auto-responses so Nexora can answer questions and perform routines instantly.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-emerald-950/10 backdrop-blur-xl transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-white/10 card-hover fade-in-up slide-in-right">
            <h2 className="text-2xl font-semibold">Automation Tools</h2>
            <p className="mt-3 text-sm leading-6 text-white">
              Use powerful workflows for reminders, logs, and integration with other services to keep workflows smooth.
            </p>
          </div>
        </div>
      </section>

      <section id="commands" className="mx-auto mt-16 max-w-6xl rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-emerald-950/20 backdrop-blur-xl fade-in-up border-glow-effect">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-white neon-text fade-in-down">Commands</p>
          <h2 className="mt-3 text-3xl font-bold neon-text fade-in-down">All Nexora commands by category</h2>
          {selectedCategory && (
            <p className="mt-2 text-sm text-emerald-200 fade-in-down">Click a category to close the view</p>
          )}
        </div>

        {!selectedCategory ? (
          <div className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((category, idx) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className="rounded-3xl border border-white/10 bg-emerald-950/10 p-6 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:bg-emerald-950/20 cursor-pointer text-left card-hover fade-in-up category-button"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <h3 className="text-xl font-semibold mb-4 neon-text">{category.icon} {category.name} ({category.count} commands)</h3>
                  <ul className="space-y-2 text-sm text-white">
                    {category.commands.slice(0, 5).map((cmd) => (
                      <li key={cmd.name}><code>/{cmd.name}</code> - {cmd.usage}</li>
                    ))}
                    {category.commands.length > 5 && (
                      <li className="text-emerald-200 font-semibold">+ {category.commands.length - 5} more...</li>
                    )}
                  </ul>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-white/10 bg-emerald-950/10 p-8 fade-in-up">
            <button
              onClick={() => setSelectedCategory(null)}
              className="mb-6 rounded-full bg-emerald-400 px-6 py-2 text-sm font-semibold text-emerald-950 shadow-lg shadow-emerald-950/15 transition hover:bg-emerald-300 button-glow"
            >
              ← Back to Categories
            </button>
            <h3 className="text-3xl font-bold mb-6 neon-text">
              {activeCategory?.icon} {activeCategory?.name} Commands ({activeCategory?.count})
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {activeCategory?.commands.map((cmd, idx) => (
                <div key={cmd.name} className="rounded-lg border border-white/5 bg-white/5 p-4 fade-in-up card-hover" style={{ animationDelay: `${idx * 0.05}s` }}>
                  <code className="text-emerald-300 text-lg font-semibold">/{cmd.name}</code>
                  <p className="text-white mt-2">{cmd.usage}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <section id="menu" className="mx-auto mt-16 max-w-6xl rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-emerald-950/20 backdrop-blur-xl fade-in-up border-glow-effect">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-white fade-in-down">Menu</p>
          <h2 className="mt-3 text-3xl font-bold fade-in-down">Main bot menu</h2>
          {selectedMenu && (
            <p className="mt-2 text-sm text-emerald-200 fade-in-down">Click to see details</p>
          )}
        </div>
        
        {!selectedMenu ? (
          <div className="grid gap-6 lg:grid-cols-3">
            <button
              onClick={() => setSelectedMenu("dashboard")}
              className="rounded-3xl border border-white/10 bg-emerald-950/10 p-6 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:bg-emerald-950/20 card-hover fade-in-up slide-in-left cursor-pointer text-left"
            >
              <h3 className="text-xl font-semibold neon-text">📊 Dashboard</h3>
              <p className="mt-2 text-white">Review Nexora activity, settings, and server stats from one place.</p>
            </button>
            <button
              onClick={() => setSelectedMenu("settings")}
              className="rounded-3xl border border-white/10 bg-emerald-950/10 p-6 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:bg-emerald-950/20 card-hover fade-in-up cursor-pointer text-left"
            >
              <h3 className="text-xl font-semibold neon-text">⚙️ Settings</h3>
              <p className="mt-2 text-white">Configure permissions, toggles, and command behavior for your community.</p>
            </button>
            <button
              onClick={() => setSelectedMenu("support")}
              className="rounded-3xl border border-white/10 bg-emerald-950/10 p-6 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:bg-emerald-950/20 card-hover fade-in-up slide-in-right cursor-pointer text-left"
            >
              <h3 className="text-xl font-semibold neon-text">🤝 Support</h3>
              <p className="mt-2 text-white">Get help with setup, bot commands, and integration guidance.</p>
            </button>
          </div>
        ) : (
          <div className="rounded-3xl border border-white/10 bg-emerald-950/10 p-8 fade-in-up">
            <button
              onClick={() => selectedMenuItem ? setSelectedMenuItem(null) : setSelectedMenu(null)}
              className="mb-6 rounded-full bg-emerald-400 px-6 py-2 text-sm font-semibold text-emerald-950 shadow-lg shadow-emerald-950/15 transition hover:bg-emerald-300 button-glow"
            >
              ← {selectedMenuItem ? "Back to Menu" : "Back to Menu"}
            </button>
            
            {selectedMenuItem ? (
              <div className="fade-in-up">
                {selectedMenu && menuItems[selectedMenu] && (() => {
                  const item = menuItems[selectedMenu].find(m => m.title === selectedMenuItem);
                  return item ? (
                    <div>
                      <h3 className="text-3xl font-bold mb-2 neon-text">{item.icon} {item.title}</h3>
                      <p className="text-emerald-200 mb-6 text-lg">{item.description}</p>
                      <div className="space-y-3 text-white">
                        <h4 className="text-xl font-semibold text-emerald-300 mb-4">Features & Details:</h4>
                        {item.details.map((detail, idx) => (
                          <div key={idx} className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-3 flex items-start gap-3 card-hover">
                            <span className="text-emerald-400 font-bold">✓</span>
                            <span className="text-white">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null;
                })()}
              </div>
            ) : (
              <>
                {selectedMenu === "dashboard" && (
                  <div className="fade-in-up">
                    <h3 className="text-3xl font-bold mb-6 neon-text">📊 Dashboard</h3>
                    <div className="space-y-4 text-white">
                      {menuItems.dashboard.map((item) => (
                        <button
                          key={item.title}
                          onClick={() => setSelectedMenuItem(item.title)}
                          className="w-full text-left rounded-lg border border-white/5 bg-white/5 p-4 card-hover transition hover:border-emerald-400/50 hover:bg-emerald-950/20 cursor-pointer group"
                        >
                          <h4 className="font-semibold text-emerald-300 group-hover:text-emerald-200 transition">{item.icon} {item.title}</h4>
                          <p className="text-sm mt-2 text-white/80 group-hover:text-white transition">{item.description}</p>
                          <p className="text-xs mt-2 text-emerald-400 opacity-0 group-hover:opacity-100 transition">Click to view details →</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {selectedMenu === "settings" && (
                  <div className="fade-in-up">
                    <h3 className="text-3xl font-bold mb-6 neon-text">⚙️ Settings</h3>
                    <div className="space-y-4 text-white">
                      {menuItems.settings.map((item) => (
                        <button
                          key={item.title}
                          onClick={() => setSelectedMenuItem(item.title)}
                          className="w-full text-left rounded-lg border border-white/5 bg-white/5 p-4 card-hover transition hover:border-emerald-400/50 hover:bg-emerald-950/20 cursor-pointer group"
                        >
                          <h4 className="font-semibold text-emerald-300 group-hover:text-emerald-200 transition">{item.icon} {item.title}</h4>
                          <p className="text-sm mt-2 text-white/80 group-hover:text-white transition">{item.description}</p>
                          <p className="text-xs mt-2 text-emerald-400 opacity-0 group-hover:opacity-100 transition">Click to view details →</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {selectedMenu === "support" && (
                  <div className="fade-in-up">
                    <h3 className="text-3xl font-bold mb-6 neon-text">🤝 Support</h3>
                    <div className="space-y-4 text-white">
                      {menuItems.support.map((item) => (
                        <button
                          key={item.title}
                          onClick={() => setSelectedMenuItem(item.title)}
                          className="w-full text-left rounded-lg border border-white/5 bg-white/5 p-4 card-hover transition hover:border-emerald-400/50 hover:bg-emerald-950/20 cursor-pointer group"
                        >
                          <h4 className="font-semibold text-emerald-300 group-hover:text-emerald-200 transition">{item.icon} {item.title}</h4>
                          <p className="text-sm mt-2 text-white/80 group-hover:text-white transition">{item.description}</p>
                          <p className="text-xs mt-2 text-emerald-400 opacity-0 group-hover:opacity-100 transition">Click to view details →</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </section>
    </main>
  )
}
