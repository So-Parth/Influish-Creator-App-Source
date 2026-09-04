import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  ArrowLeft, ArrowRight, ArrowUpRight, Bell, BookmarkSimple, Briefcase,
  Calculator, CalendarBlank, Camera, CaretDown, CaretRight, ChartBar,
  ChartLineUp, ChartPieSlice, ChatCircleDots, Check, CheckCircle, CirclesFour,
  Copy, Crown, DotsThreeVertical, Eye, FileText, FilmSlate, FirstAidKit,
  Gauge, Gift, Handshake, Heartbeat, House, Info, InstagramLogo, Lightning,
  Lightbulb, MagicWand, MagnifyingGlass, Megaphone, MetaLogo, MusicNotes,
  PaperPlaneTilt, Play, Plus, Robot, SealCheck, ShareNetwork, ShieldWarning,
  Sparkle, SquaresFour, Toolbox, TrendUp, UserCircle, UsersThree, X,
  type Icon,
} from "@phosphor-icons/react";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { BottomSheet, Carousel, MobileScroll } from "./mobile";

type Segment = "subscribed" | "connected-free" | "new";
type Tab = "home" | "autodm" | "inaya" | "tools" | "insights";
type DetailPage =
  | "profile" | "chats" | "notifications" | "creator-edu"
  | "referral" | "campaigns" | "inaya-result" | null;

const segmentLabels: Record<Segment, string> = {
  subscribed: "IG + Pro",
  "connected-free": "IG, no Pro",
  new: "New creator",
};

const activityItems = [
  { name: "Sangini", action: "gained 300 followers using Auto-DM.", tone: "pink" },
  { name: "Aarav", action: "booked a paid beauty collaboration.", tone: "purple" },
  { name: "Meher", action: "saved 4 hours with Inaya scripts.", tone: "mint" },
  { name: "Riya", action: "connected Instagram and unlocked insights.", tone: "orange" },
];

const insightData = [
  3, 3, 1, 0, 7, 2, 0, 2, 3, 0, 2, 1, 2, 0, 5, 0, 0, 0, 2, 1, 3, 1, 4, 0, 1, 1, 3, 0,
].map((views, index) => ({
  views,
  day: index === 0 ? "27 Jul" : index === 12 ? "10 Aug" : index === 27 ? "25 Aug" : "",
}));

const quickTools: { label: string; image: string; tone: string; tab: Tab }[] = [
  { label: "Auto-DM", image: "/assets/prototype/tool-autodm-3d.png", tone: "violet", tab: "autodm" },
  { label: "Insights", image: "/assets/prototype/tool-insights-3d.png", tone: "purple", tab: "insights" },
  { label: "AI Studio", image: "/assets/prototype/tool-ai-studio-3d.png", tone: "cyan", tab: "inaya" },
  { label: "Collab Charges", image: "/assets/prototype/tool-collab-3d.png", tone: "gold", tab: "tools" },
  { label: "IG Health", image: "/assets/prototype/tool-health-3d.png", tone: "red", tab: "tools" },
];

const inayaActions: { title: string; text: string; icon: Icon; tone: string }[] = [
  { title: "Get reel ideas", text: "Fresh ideas for your niche", icon: Lightbulb, tone: "violet" },
  { title: "Generate scripts", text: "Hooks, scenes and CTA", icon: FileText, tone: "peach" },
  { title: "Content calendar", text: "Plan the next 30 days", icon: CalendarBlank, tone: "mint" },
  { title: "Saved ideas", text: "Your creative vault", icon: BookmarkSimple, tone: "pink" },
  { title: "Trending IG audio", text: "Sounds gaining momentum", icon: MusicNotes, tone: "blue" },
  { title: "Viral reel formats", text: "Formats worth recreating", icon: FilmSlate, tone: "gold" },
];

const tools: { title: string; text: string; icon: Icon; tone: string; tab?: Tab; campaign?: boolean }[] = [
  { title: "Auto-DM", text: "Turn comments and replies into conversations", icon: ChatCircleDots, tone: "violet", tab: "autodm" },
  { title: "Collab Charges", text: "Keep your current brand pricing organised", icon: Handshake, tone: "gold" },
  { title: "AI Studio", text: "Create ideas, captions and scripts with AI", icon: Sparkle, tone: "purple", tab: "inaya" },
  { title: "Campaigns", text: "Apply, track and manage brand opportunities", icon: Briefcase, tone: "blue", campaign: true },
  { title: "Collab rate calculator", text: "Know what to charge for your next deal", icon: Calculator, tone: "mint" },
  { title: "Trending IG audio", text: "Find sounds before they become saturated", icon: MusicNotes, tone: "pink" },
  { title: "IG suspension help", text: "Steps and support to recover your account", icon: FirstAidKit, tone: "orange" },
  { title: "IG account health", text: "Check risks that may affect your reach", icon: Heartbeat, tone: "red" },
];

function IconButton({ label, children, onClick, badge, className = "" }: {
  label: string; children: ReactNode; onClick?: () => void; badge?: boolean; className?: string;
}) {
  return (
    <button className={`icon-button ${className}`} type="button" aria-label={label} onClick={onClick}>
      {children}{badge && <span className="notification-dot" />}
    </button>
  );
}

function SectionTitle({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return (
    <div className="section-heading">
      <h2>{title}</h2>
      {action && <button type="button" onClick={onAction}>{action}<CaretRight size={14} weight="bold" /></button>}
    </div>
  );
}

function Header({ segment, openPage }: { segment: Segment; openPage: (page: DetailPage) => void }) {
  const connected = segment !== "new";
  return (
    <header className="home-header">
      {connected ? (
        <button className="profile-summary" type="button" onClick={() => openPage("profile")}>
          <img src="/assets/prototype/avatar.png" alt="Creator profile" draggable="false" />
          <span className="follower-copy"><strong>3,200</strong><small>Followers</small></span>
          <span className="gain-pill">+212 <ArrowUpRight size={11} weight="bold" /></span>
        </button>
      ) : (
        <button className="wordmark" type="button" onClick={() => openPage("profile")} aria-label="Open profile">
          influish<span>.</span>
        </button>
      )}
      <div className="header-actions">
        <IconButton label="Refer and earn" onClick={() => openPage("referral")} className="referral-trigger"><Gift size={24} weight="fill" /></IconButton>
        <IconButton label="Campaign chats" onClick={() => openPage("chats")}><ChatCircleDots size={23} /></IconButton>
        <IconButton label="Notifications" onClick={() => openPage("notifications")} badge><Bell size={23} /></IconButton>
      </div>
    </header>
  );
}

function BannerRail({ setTab }: { setTab: (tab: Tab) => void }) {
  return (
    <section aria-label="Influish highlights" className="banner-section">
      <Carousel ariaLabel="Influish highlights" className="banner-carousel" contentClassName="banner-track">
        <article className="feature-banner banner-autodm">
          <div className="banner-copy">
            <span className="banner-kicker">AUTO-DM</span>
            <h2>Never miss a lead.<br /><em>DMs on autopilot.</em></h2>
            <p>Smart replies. Better leads.<br />More conversions.</p>
            <button type="button" onClick={() => setTab("autodm")}>Set up Auto-DM <ArrowRight size={14} weight="bold" /></button>
          </div>
          <img className="banner-art" src="/assets/prototype/autodm-hero.png" alt="Auto-DM conversation preview" draggable="false" />
        </article>
        <article className="feature-banner banner-ai">
          <div className="banner-copy">
            <span className="banner-kicker">AI STUDIO</span>
            <h2>Your next reel<br /><em>starts with Inaya.</em></h2>
            <p>Ideas, hooks and scripts<br />built around your niche.</p>
            <button type="button" onClick={() => setTab("inaya")}>Create with AI <Sparkle size={14} weight="fill" /></button>
          </div>
          <div className="banner-icon-orbit"><Robot size={54} weight="duotone" /><Sparkle size={18} weight="fill" /></div>
        </article>
        <article className="feature-banner banner-grow">
          <div className="banner-copy">
            <span className="banner-kicker">CREATOR GROWTH</span>
            <h2>Know what worked.<br /><em>Grow with clarity.</em></h2>
            <p>Simple insights from your<br />latest Instagram content.</p>
            <button type="button" onClick={() => setTab("insights")}>View insights <ChartLineUp size={14} weight="bold" /></button>
          </div>
          <div className="banner-icon-orbit"><ChartLineUp size={56} weight="duotone" /><TrendUp size={20} weight="bold" /></div>
        </article>
      </Carousel>
      <div className="carousel-dots" aria-hidden="true"><span className="active" /><span /><span /></div>
    </section>
  );
}

function PoweredByMeta() {
  return <div className="meta-powered"><span>Powered by</span><MetaLogo size={18} weight="fill" /><strong>Meta</strong></div>;
}

function ReelInsights({ setTab }: { setTab: (tab: Tab) => void }) {
  const reels = [
    { title: "Guilt Free Chocolate Chip Cookies", time: "Yesterday · 12:30 PM", views: "125K", skip: "32.5%", likes: "8,432", comments: "512" },
    { title: "3 creator habits that changed my reach", time: "Tuesday · 6:10 PM", views: "94K", skip: "28.4%", likes: "6,201", comments: "428" },
    { title: "My easiest lighting setup", time: "Sunday · 11:00 AM", views: "76K", skip: "26.1%", likes: "5,640", comments: "301" },
  ];
  return (
    <section className="reel-card">
      <div className="card-title-row">
        <div><ChartLineUp size={18} color="#6f3ee8" weight="bold" /><strong>Recent reel insights</strong></div>
        <button type="button" onClick={() => setTab("insights")}>View all <ArrowRight size={13} /></button>
      </div>
      <Carousel ariaLabel="Recent reel insights" className="reel-carousel" contentClassName="reel-track">
        {reels.map((reel, index) => (
          <article className="reel-slide" key={reel.title}>
            <div className="reel-topline">
              <img src="/assets/prototype/reel-cookie.png" alt="Recent food reel" draggable="false" />
              <div><strong>{reel.title}</strong><small>{reel.time}</small></div>
              <span className="instagram-chip"><InstagramLogo size={14} weight="fill" /></span>
            </div>
            <div className="metric-grid">
              <span><Eye size={16} /><strong>{reel.views}</strong><small>Views</small></span>
              <span><TrendUp size={16} /><strong>{reel.skip}</strong><small>Skip rate</small></span>
              <span><Heartbeat size={16} /><strong>{reel.likes}</strong><small>Likes</small></span>
              <span><ChatCircleDots size={16} /><strong>{reel.comments}</strong><small>Comments</small></span>
            </div>
            <span className="reel-number">0{index + 1}</span>
          </article>
        ))}
      </Carousel>
    </section>
  );
}

function ConnectInstagramCard() {
  return (
    <section className="connect-card">
      <div className="connect-icon"><InstagramLogo size={32} weight="fill" /></div>
      <span className="eyebrow">UNLOCK YOUR CREATOR VIEW</span>
      <h2>Connect Instagram.<br />Grow with the full picture.</h2>
      <p>See what works, automate DMs and track your growth from one place.</p>
      <ul>
        <li><CheckCircle size={17} weight="fill" /> Account and reel insights</li>
        <li><CheckCircle size={17} weight="fill" /> Auto-DM for comments and stories</li>
        <li><CheckCircle size={17} weight="fill" /> Better creator opportunities</li>
      </ul>
      <button type="button"><InstagramLogo size={18} weight="fill" /> Connect Instagram</button>
      <small>Secure connection powered by Meta</small>
    </section>
  );
}

function QuickAccess({ setTab }: { setTab: (tab: Tab) => void }) {
  return (
    <section className="section-block quick-section">
      <SectionTitle title="Quick Access" />
      <Carousel ariaLabel="Quick access tools" className="quick-carousel" contentClassName="quick-track">
        {quickTools.map((tool) => {
          return (
            <button type="button" className="quick-tool" key={tool.label} onClick={() => setTab(tool.tab)}>
              <span className={`quick-tool-visual ${tool.tone}`}><img src={tool.image} alt="" draggable="false" /></span>
              <strong>{tool.label}</strong>
            </button>
          );
        })}
      </Carousel>
    </section>
  );
}

function ActivityCard({ segment, index }: { segment: Segment; index: number }) {
  const item = segment === "new"
    ? [{ name: "Riya", action: "connected Instagram and unlocked insights.", tone: "orange" }, ...activityItems][index % 5]
    : activityItems[index % activityItems.length];
  return (
    <section className={`activity-card ${item.tone}`} aria-live="polite">
      <span className="live-pill">LIVE</span>
      <span className="activity-avatar"><UsersThree size={20} weight="duotone" /></span>
      <p><strong>{item.name}</strong> {item.action}</p>
      <span className="activity-growth"><TrendUp size={26} weight="duotone" /></span>
    </section>
  );
}

function SubscriptionCard() {
  return (
    <section className="subscription-card">
      <div className="subscription-top"><span><Crown size={25} weight="fill" /></span><div><small>INFLUISH PRO</small><h2>Turn your audience into income.</h2></div></div>
      <div className="benefit-row">
        <span><Check size={14} weight="bold" /> Unlimited Auto-DM</span>
        <span><Check size={14} weight="bold" /> Deeper insights</span>
        <span><Check size={14} weight="bold" /> Premium AI tools</span>
      </div>
      <button type="button">Explore Pro <ArrowRight size={14} weight="bold" /></button>
    </section>
  );
}

function CreatorEdu({ openAll }: { openAll: () => void }) {
  const videos = [
    { title: "A reel hook people stop for", duration: "4:18", image: "/assets/prototype/creator-hook.png", tag: "START HERE" },
    { title: "Write your reel in 5 minutes", duration: "6:42", image: "/assets/prototype/creator-script.png", tag: "SCRIPTING" },
    { title: "Edit for watch time, not effects", duration: "5:06", image: "/assets/prototype/creator-edit.png", tag: "EDITING" },
  ];
  return (
    <section className="section-block creator-edu">
      <SectionTitle title="CreatorEdu" action="View All" onAction={openAll} />
      <p className="section-subtitle">Small lessons. Stronger content.</p>
      <Carousel ariaLabel="Creator education videos" className="edu-carousel" contentClassName="edu-track">
        {videos.map((video) => (
          <button type="button" className="edu-card" key={video.title} onClick={openAll}>
            <span className="edu-image">
              <img src={video.image} alt="Creator education instructor" draggable="false" />
              <span className="play-button"><Play size={15} weight="fill" /></span><small>{video.duration}</small>
            </span>
            <span className="edu-copy"><em>{video.tag}</em><strong>{video.title}</strong></span>
          </button>
        ))}
      </Carousel>
    </section>
  );
}

function ReferralCard({ openReferral }: { openReferral: () => void }) {
  return (
    <section className="referral-card">
      <img src="/assets/prototype/referral-ticket.png" alt="Golden referral ticket" draggable="false" />
      <div>
        <span className="eyebrow">REFER & EARN</span>
        <h2>Grow together.<br />Get rewarded.</h2>
        <p>Invite creator friends and unlock exclusive benefits.</p>
        <button type="button" onClick={openReferral}>See rewards <ArrowRight size={14} weight="bold" /></button>
      </div>
    </section>
  );
}

function HomeScreen({ segment, setTab, openPage, activityIndex }: {
  segment: Segment; setTab: (tab: Tab) => void; openPage: (page: DetailPage) => void; activityIndex: number;
}) {
  return (
    <MobileScroll className="app-screen home-screen">
      <main className="screen-content home-content">
        <div className="home-top-lavender">
          <Header segment={segment} openPage={openPage} />
          <BannerRail setTab={setTab} />
          <PoweredByMeta />
        </div>
        {segment !== "new" && <ReelInsights setTab={setTab} />}
        {segment === "new" && <ConnectInstagramCard />}
        <QuickAccess setTab={setTab} />
        <ActivityCard segment={segment} index={activityIndex} />
        {segment === "connected-free" && <SubscriptionCard />}
        <CreatorEdu openAll={() => openPage("creator-edu")} />
        <ReferralCard openReferral={() => openPage("referral")} />
      </main>
    </MobileScroll>
  );
}

function AutomationCard({ type, title, subtitle, accent, image }: { type: string; title: string; subtitle: string; accent: string; image: string }) {
  return (
    <article className="automation-card">
      <div className={`automation-type ${accent}`}><img src={image} alt="" draggable="false" /><small>{type}</small></div>
      <div className="automation-info"><strong>{title}</strong><p>{subtitle}</p><span>any message</span></div>
      <DotsThreeVertical size={20} weight="bold" />
      <div className="automation-stats">
        <span><strong>0</strong><small>DMs Sent</small></span><span><strong>0</strong><small>DMs Seen</small></span>
        <span><strong>0</strong><small>Followers</small></span><span className="preview-stat"><Eye size={16} /><small>Preview</small></span>
      </div>
    </article>
  );
}

function AutoDMScreen({ onCreate }: { onCreate: () => void }) {
  const [filter, setFilter] = useState("Live");
  return (
    <MobileScroll className="app-screen page-screen">
      <main className="screen-content tab-content">
        <div className="page-title"><div><ChatCircleDots size={26} color="#6844ca" weight="duotone" /><h1>Auto-DMs</h1></div><button type="button" className="faq-button">FAQ</button></div>
        <div className="title-row"><h2>Metrics</h2><button type="button"><CalendarBlank size={15} /> All Time <CaretDown size={12} /></button></div>
        <div className="dm-metrics">
          <article className="metric-wide"><ChatCircleDots size={19} weight="duotone" /><span>DMs Sent<strong>135</strong></span><Info size={16} /></article>
          <article className="seen"><Eye size={19} weight="duotone" /><span>DMs Seen<strong>93</strong></span><Info size={16} /></article>
          <article className="followers"><ChartLineUp size={19} weight="duotone" /><span>Followers Gained<strong>12</strong></span><Info size={16} /></article>
        </div>
        <div className="segmented-control">
          {["Live", "Paused", "Completed", "Disabled"].map((name) => <button className={filter === name ? "active" : ""} type="button" key={name} onClick={() => setFilter(name)}>{name}</button>)}
        </div>
        <button className="search-field" type="button"><MagnifyingGlass size={19} /><span>Search for automation</span><SquaresFour size={18} /></button>
        <div className="automation-list">
          <AutomationCard type="All Story" title="Story Reply Auto-DM 19" subtitle="when a user replies to your story" accent="story" image="/assets/prototype/dm-story-3d.png" />
          <AutomationCard type="User DMs" title="DM 3" subtitle="when a user DMs you" accent="user" image="/assets/prototype/dm-user-3d.png" />
          <AutomationCard type="Comment" title="Reel Comment Leads" subtitle="when someone comments a keyword" accent="comment" image="/assets/prototype/dm-comment-3d.png" />
        </div>
      </main>
      <button className="floating-create" type="button" onClick={onCreate}><Plus size={18} weight="bold" /> New automation</button>
    </MobileScroll>
  );
}

function InayaScreen({ openResult }: { openResult: (title: string) => void }) {
  return (
    <MobileScroll className="app-screen page-screen inaya-screen">
      <main className="screen-content tab-content">
        <section className="inaya-hero">
          <span className="inaya-avatar"><Robot size={42} weight="duotone" /></span>
          <span className="eyebrow">YOUR SOCIAL MEDIA MANAGER</span><h1>Hi, I’m Inaya.</h1>
          <p>Let’s turn your next thought into content people want to watch.</p>
          <button type="button" onClick={() => openResult("Get reel ideas")}><Sparkle size={18} weight="fill" /> Ask Inaya anything</button>
        </section>
        <SectionTitle title="What do you want to make?" />
        <div className="inaya-grid">
          {inayaActions.map((action) => {
            const ActionIcon = action.icon;
            return (
              <button type="button" key={action.title} className="inaya-action" onClick={() => openResult(action.title)}>
                <span className={`tool-icon ${action.tone}`}><ActionIcon size={25} weight="duotone" /></span>
                <strong>{action.title}</strong><small>{action.text}</small><CaretRight size={15} />
              </button>
            );
          })}
        </div>
        <section className="inaya-tip"><Lightning size={22} weight="fill" /><div><strong>Inaya gets better with context</strong><p>Tell her your niche, audience and how you want the reel to feel.</p></div></section>
      </main>
    </MobileScroll>
  );
}

function ToolsScreen({ setTab, openCampaigns }: { setTab: (tab: Tab) => void; openCampaigns: () => void }) {
  return (
    <MobileScroll className="app-screen page-screen tools-screen">
      <main className="screen-content tab-content">
        <div className="page-title"><div><Toolbox size={27} color="#6844ca" weight="duotone" /><h1>inTools</h1></div></div>
        <p className="page-intro">Everything you need to create, grow and earn — in one place.</p>
        <div className="tools-list">
          {tools.map((tool) => {
            const ToolIcon = tool.icon;
            return (
              <button type="button" className="tool-row" key={tool.title} onClick={() => tool.campaign ? openCampaigns() : tool.tab && setTab(tool.tab)}>
                <span className={`tool-icon ${tool.tone}`}><ToolIcon size={25} weight="duotone" /></span>
                <span><strong>{tool.title}</strong><small>{tool.text}</small></span><CaretRight size={17} />
              </button>
            );
          })}
        </div>
      </main>
    </MobileScroll>
  );
}

function InsightsScreen() {
  const [range, setRange] = useState("30 days");
  const [reelFilter, setReelFilter] = useState("Latest");
  return (
    <MobileScroll className="app-screen page-screen insights-screen">
      <main className="screen-content tab-content">
        <div className="page-title insights-title"><div><ChartPieSlice size={27} color="#6844ca" weight="duotone" /><h1>Insights</h1></div><button type="button"><ShareNetwork size={21} /></button></div>
        <div className="insight-tabs"><button className="active" type="button">Overview</button><button type="button">Audience</button><button type="button">Content</button></div>
        <div className="title-row"><h2>Account <Info size={14} /></h2><button type="button" onClick={() => setRange(range === "30 days" ? "7 days" : "30 days")}>{range} <CaretDown size={12} /></button></div>
        <Carousel ariaLabel="Account metrics" className="account-carousel" contentClassName="account-track">
          <article className="account-metric selected"><small>Reel views</small><strong>49K</strong><span><TrendUp size={13} /> 18.4%</span></article>
          <article className="account-metric"><small>Viewers</small><strong>17.5K</strong><span><TrendUp size={13} /> 12.1%</span></article>
          <article className="account-metric"><small>Net follows</small><strong>+212</strong><span><TrendUp size={13} /> 8.3%</span></article>
        </Carousel>
        <section className="chart-card" aria-label="Reel views over the last 30 days">
          <div className="chart-summary"><span><small>Reel views</small><strong>49,020</strong></span><span className="positive"><TrendUp size={14} /> 18.4%</span></div>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={insightData} margin={{ top: 10, right: 8, left: -25, bottom: 0 }}>
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#8d879a" }} axisLine={false} tickLine={false} interval={0} />
                <YAxis domain={[0, 8]} ticks={[0, 4, 8]} tick={{ fontSize: 10, fill: "#aaa3b7" }} axisLine={false} tickLine={false} />
                <Line type="linear" dataKey="views" stroke="#7547e8" strokeWidth={2.6} dot={false} animationDuration={900} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
        <div className="title-row reels-heading"><h2>Reels <Info size={14} /></h2><button type="button">All <CaretDown size={12} /></button></div>
        <Carousel ariaLabel="Reel filters" className="filter-carousel" contentClassName="filter-track">
          {["Latest", "Most views", "Most likes", "Most comments"].map((name) => <button type="button" className={reelFilter === name ? "active" : ""} key={name} onClick={() => setReelFilter(name)}>{name}</button>)}
        </Carousel>
        <article className="insight-reel">
          <img src="/assets/prototype/reel-cookie.png" alt="Recent reel" draggable="false" />
          <div><strong>Guilt free cookie recipe</strong><small>26 Aug · 34 sec</small><span><Heartbeat size={14} /> 8,432 <ChatCircleDots size={14} /> 512 <BookmarkSimple size={14} /> 301</span></div>
          <div className="reel-views"><small>1 of 10</small><strong>125K</strong><span>Views</span></div>
        </article>
      </main>
    </MobileScroll>
  );
}

function BottomNav({ tab, setTab }: { tab: Tab; setTab: (tab: Tab) => void }) {
  const navItems: { id: Tab; label: string; icon: Icon }[] = [
    { id: "home", label: "Home", icon: House }, { id: "autodm", label: "Auto-DM", icon: Robot },
    { id: "inaya", label: "Inaya", icon: Sparkle }, { id: "tools", label: "inTools", icon: Toolbox },
    { id: "insights", label: "Insights", icon: ChartPieSlice },
  ];
  return (
    <nav className="bottom-nav" aria-label="Primary navigation">
      {navItems.map((item) => {
        const NavIcon = item.icon;
        return (
          <button type="button" key={item.id} className={`${tab === item.id ? "active" : ""} ${item.id === "inaya" ? "inaya-nav" : ""}`} onClick={() => setTab(item.id)}>
            <span><NavIcon size={item.id === "inaya" ? 25 : 22} weight={tab === item.id ? "fill" : "regular"} /></span><small>{item.label}</small>
          </button>
        );
      })}
    </nav>
  );
}

function BackHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return <header className="back-header"><IconButton label="Go back" onClick={onBack}><ArrowLeft size={22} /></IconButton><h1>{title}</h1><span className="header-spacer" /></header>;
}

function ProfileDetail() {
  return (
    <>
      <section className="profile-card">
        <img src="/assets/prototype/avatar.png" alt="Creator profile" /><h2>Shrawan Creator</h2><p>@shrawancreates</p>
        <span><SealCheck size={16} weight="fill" /> Instagram connected</span>
        <div><strong>3,200<small>Followers</small></strong><strong>5.8%<small>Engagement</small></strong><strong>212<small>30d growth</small></strong></div>
      </section>
      <section className="plain-card"><SectionTitle title="Creator profile strength" /><div className="progress-line"><span /></div><strong>82% complete</strong><p>Add your rates and content categories to improve campaign matches.</p><button type="button" className="primary-full">Complete profile</button></section>
    </>
  );
}

function ChatDetail() {
  const chats = [
    { brand: "Glow & Co.", message: "We loved your concept. Can we lock Friday?", time: "2m", unread: true },
    { brand: "Mellow Foods", message: "The campaign brief is ready for review.", time: "1h", unread: true },
    { brand: "Fitroom", message: "Thank you for sharing the final reel!", time: "Wed", unread: false },
  ];
  return <section className="detail-list">{chats.map((chat) => <button type="button" key={chat.brand}><span className="brand-avatar"><Briefcase size={20} /></span><span><strong>{chat.brand}</strong><small>{chat.message}</small></span><span className="list-meta">{chat.time}{chat.unread && <i />}</span></button>)}</section>;
}

function NotificationDetail() {
  const notices: { icon: Icon; title: string; text: string; tone: string }[] = [
    { icon: Gift, title: "Referral reward unlocked", text: "Your friend joined Influish. You earned 7 Pro days.", tone: "gold" },
    { icon: Briefcase, title: "New campaign match", text: "A skincare campaign fits your profile.", tone: "blue" },
    { icon: TrendUp, title: "Your reel is taking off", text: "Views are 38% higher than your recent average.", tone: "mint" },
  ];
  return <section className="detail-list notifications-list">{notices.map((item) => { const NoticeIcon = item.icon; return <button type="button" key={item.title}><span className={`tool-icon ${item.tone}`}><NoticeIcon size={22} weight="duotone" /></span><span><strong>{item.title}</strong><small>{item.text}</small></span><CaretRight size={16} /></button>; })}</section>;
}

function EducationDetail() {
  const lessons = [
    { image: "/assets/prototype/creator-hook.png", title: "Build a hook people stop for", meta: "Beginner · 4 min" },
    { image: "/assets/prototype/creator-script.png", title: "Write a high-retention reel", meta: "Beginner · 7 min" },
    { image: "/assets/prototype/creator-edit.png", title: "Edit for watch time", meta: "Intermediate · 5 min" },
    { image: "/assets/prototype/creator-hook.png", title: "Turn one idea into five posts", meta: "Beginner · 6 min" },
  ];
  return (
    <>
      <section className="edu-feature"><img src="/assets/prototype/creator-hook.png" alt="Featured CreatorEdu lesson" /><span className="play-button"><Play size={18} weight="fill" /></span><div><small>FEATURED PATH</small><h2>Start your creator journey</h2><p>5 short lessons to build a content system that lasts.</p></div></section>
      <SectionTitle title="All lessons" />
      <section className="lesson-list">{lessons.map((lesson) => <button type="button" key={lesson.title}><img src={lesson.image} alt="Creator lesson" /><span><strong>{lesson.title}</strong><small>{lesson.meta}</small></span><Play size={17} weight="fill" /></button>)}</section>
    </>
  );
}

function ReferralDetail() {
  return (
    <>
      <section className="referral-hero-detail"><img src="/assets/prototype/referral-ticket.png" alt="Golden referral ticket" /><span className="eyebrow">CREATOR REWARDS</span><h2>Invite creators.<br />Unlock more Influish.</h2><p>They get a smoother start. You get rewards every time an eligible friend joins.</p></section>
      <section className="plain-card reward-card"><SectionTitle title="Your referral link" /><div className="referral-link"><span>influish.com/r/shrawan</span><button type="button"><Copy size={17} /> Copy</button></div><div className="reward-stats"><span><strong>4</strong><small>Friends joined</small></span><span><strong>21</strong><small>Pro days earned</small></span></div><button type="button" className="primary-full"><ShareNetwork size={17} /> Invite creator friends</button></section>
    </>
  );
}

function CampaignDetail() {
  const [view, setView] = useState("Explore");
  return (
    <>
      <div className="segmented-control campaign-tabs">{["All", "My Campaigns", "Explore"].map((item) => <button type="button" className={view === item ? "active" : ""} onClick={() => setView(item)} key={item}>{item}</button>)}</div>
      <section className="campaign-feature"><span className="brand-avatar"><Megaphone size={22} /></span><small>SKINCARE · PAID</small><h2>Everyday Barrier Care</h2><p>Make one reel showing your honest evening skincare routine.</p><div><span>₹18K–₹30K</span><span>Apply by 31 Aug</span></div><button type="button" className="primary-full">View campaign</button></section>
      <section className="campaign-mini-grid"><article><span className="brand-avatar"><Camera size={20} /></span><strong>Travel diary reel</strong><small>₹22K · Travel</small></article><article><span className="brand-avatar"><Gauge size={20} /></span><strong>Fitness challenge</strong><small>₹15K · Fitness</small></article></section>
    </>
  );
}

function InayaResult({ title }: { title: string }) {
  return (
    <>
      <section className="inaya-prompt-card"><span><Robot size={27} weight="duotone" /></span><small>INAYA IS READY</small><h2>{title}</h2><p>Here’s a strong starting point based on your creator profile.</p></section>
      <section className="plain-card inaya-output"><span className="eyebrow">IDEA 01</span><h2>“What nobody tells you before your first brand deal”</h2><p><strong>Hook:</strong> I wish someone had told me these three things before I said yes to my first collaboration.</p><p><strong>Format:</strong> Face-to-camera with quick B-roll cutaways.</p><p><strong>CTA:</strong> Save this before your next brand email arrives.</p><div><button type="button"><Copy size={16} /> Copy</button><button type="button"><BookmarkSimple size={16} /> Save</button></div></section>
      <button type="button" className="primary-full"><Sparkle size={17} weight="fill" /> Generate another</button>
    </>
  );
}

function DetailScreen({ page, onBack, inayaTitle }: { page: Exclude<DetailPage, null>; onBack: () => void; inayaTitle: string }) {
  const titles: Record<Exclude<DetailPage, null>, string> = {
    profile: "Profile", chats: "Campaign chats", notifications: "Notifications",
    "creator-edu": "CreatorEdu", referral: "Refer & Earn", campaigns: "Campaigns", "inaya-result": "Inaya",
  };
  return (
    <MobileScroll className="app-screen detail-screen">
      <main className="screen-content detail-content">
        <BackHeader title={titles[page]} onBack={onBack} />
        {page === "profile" && <ProfileDetail />}{page === "chats" && <ChatDetail />}
        {page === "notifications" && <NotificationDetail />}{page === "creator-edu" && <EducationDetail />}
        {page === "referral" && <ReferralDetail />}{page === "campaigns" && <CampaignDetail />}
        {page === "inaya-result" && <InayaResult title={inayaTitle} />}
      </main>
    </MobileScroll>
  );
}

function Walkthrough({ step, onNext, onSkip }: { step: number; onNext: () => void; onSkip: () => void }) {
  const items: { title: string; text: string; icon: Icon }[] = [
    { title: "Your creator home", text: "See tools, lessons and growth in one place.", icon: House },
    { title: "Automate conversations", text: "Auto-DM turns comments and replies into leads.", icon: Robot },
    { title: "Create with Inaya", text: "Get ideas, scripts and a complete content plan.", icon: Sparkle },
    { title: "Understand your growth", text: "Connect Instagram to unlock useful insights.", icon: ChartPieSlice },
  ];
  const item = items[step];
  const StepIcon = item.icon;
  return (
    <div className="walkthrough-layer">
      <div className={`walkthrough-card step-${step}`}>
        <span className="walkthrough-icon"><StepIcon size={24} weight="duotone" /></span>
        <button type="button" className="walkthrough-close" onClick={onSkip}><X size={17} /></button>
        <small>{step + 1} OF {items.length}</small><h3>{item.title}</h3><p>{item.text}</p>
        <div><button type="button" className="text-button" onClick={onSkip}>Skip</button><button type="button" className="next-button" onClick={onNext}>{step === items.length - 1 ? "Got it" : "Next"} <ArrowRight size={14} /></button></div>
      </div>
    </div>
  );
}

export default function Prototype() {
  const [segment, setSegment] = useState<Segment>("subscribed");
  const [tab, setTab] = useState<Tab>("home");
  const [detailPage, setDetailPage] = useState<DetailPage>(null);
  const [sheet, setSheet] = useState<"state" | "create-dm" | null>(null);
  const [activityIndex, setActivityIndex] = useState(0);
  const [walkthroughStep, setWalkthroughStep] = useState<number | null>(null);
  const [inayaTitle, setInayaTitle] = useState("Get reel ideas");

  useEffect(() => {
    const timer = window.setInterval(() => setActivityIndex((current) => current + 1), 2800);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (segment === "new") { setTab("home"); setWalkthroughStep(0); }
    else setWalkthroughStep(null);
  }, [segment]);

  const activeScreen = useMemo(() => {
    if (detailPage) return <DetailScreen page={detailPage} onBack={() => setDetailPage(null)} inayaTitle={inayaTitle} />;
    if (tab === "home") return <HomeScreen segment={segment} setTab={setTab} openPage={setDetailPage} activityIndex={activityIndex} />;
    if (tab === "autodm") return <AutoDMScreen onCreate={() => setSheet("create-dm")} />;
    if (tab === "inaya") return <InayaScreen openResult={(title) => { setInayaTitle(title); setDetailPage("inaya-result"); }} />;
    if (tab === "tools") return <ToolsScreen setTab={setTab} openCampaigns={() => setDetailPage("campaigns")} />;
    return <InsightsScreen />;
  }, [detailPage, inayaTitle, tab, segment, activityIndex]);

  const handleTab = (nextTab: Tab) => { setDetailPage(null); setTab(nextTab); };

  return (
    <div className="influish-app">
      {activeScreen}
      {!detailPage && <BottomNav tab={tab} setTab={handleTab} />}
      {!detailPage && (
        <button type="button" className="prototype-state-button" onClick={() => setSheet("state")} aria-label="Switch prototype user state">
          <CirclesFour size={18} weight="duotone" /><span>{segmentLabels[segment]}</span>
        </button>
      )}
      {walkthroughStep !== null && <Walkthrough step={walkthroughStep} onSkip={() => setWalkthroughStep(null)} onNext={() => walkthroughStep >= 3 ? setWalkthroughStep(null) : setWalkthroughStep(walkthroughStep + 1)} />}

      <BottomSheet open={sheet === "state"} onOpenChange={(open) => !open && setSheet(null)} title="Preview user state" description="Switch between the three Home experiences.">
        <div className="state-options">
          {([
            { id: "subscribed" as Segment, icon: Crown, title: "Instagram + Pro", text: "Connected account with an active subscription" },
            { id: "connected-free" as Segment, icon: InstagramLogo, title: "Instagram, no Pro", text: "Connected account without a subscription" },
            { id: "new" as Segment, icon: UserCircle, title: "New creator", text: "No Instagram connection and no subscription" },
          ]).map((option) => {
            const StateIcon = option.icon;
            return (
              <button type="button" key={option.id} className={segment === option.id ? "selected" : ""} onClick={() => { setSegment(option.id); setSheet(null); }}>
                <span className="tool-icon violet"><StateIcon size={23} weight="duotone" /></span>
                <span><strong>{option.title}</strong><small>{option.text}</small></span>
                {segment === option.id ? <CheckCircle size={20} weight="fill" /> : <CaretRight size={17} />}
              </button>
            );
          })}
        </div>
      </BottomSheet>

      <BottomSheet open={sheet === "create-dm"} onOpenChange={(open) => !open && setSheet(null)} title="Create an Auto-DM" description="Choose what should trigger your automated reply.">
        <div className="create-dm-options">
          <button type="button" onClick={() => setSheet(null)}><span className="tool-icon violet"><ChatCircleDots size={23} weight="duotone" /></span><span><strong>Reel comments</strong><small>Reply when someone comments a keyword</small></span><CaretRight size={17} /></button>
          <button type="button" onClick={() => setSheet(null)}><span className="tool-icon blue"><PaperPlaneTilt size={23} weight="duotone" /></span><span><strong>Story replies</strong><small>Reply when someone responds to a story</small></span><CaretRight size={17} /></button>
          <button type="button" onClick={() => setSheet(null)}><span className="tool-icon pink"><InstagramLogo size={23} weight="duotone" /></span><span><strong>Incoming DMs</strong><small>Reply when someone sends a message</small></span><CaretRight size={17} /></button>
        </div>
      </BottomSheet>
    </div>
  );
}
