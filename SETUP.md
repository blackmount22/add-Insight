# AddInsight Setup & Development Guide

## 🎯 Project Overview

- **Framework**: Next.js 15+ with React & TypeScript
- **Styling**: Tailwind CSS
- **Architecture**: Frontend-first with web scraping capabilities
- **Target**: Public dashboard (no authentication)

## 📁 Project Structure

```
app/
├── components/
│   ├── dashboard/Dashboard.tsx    # Main dashboard
│   ├── sections/                  # 3 info areas
│   │   ├── IT-section.tsx
│   │   ├── AI-section.tsx
│   │   └── USStock-section.tsx
│   └── ui/card.tsx                # Reusable card
├── lib/scraper.ts                 # Scraping utilities
├── page.tsx                        # Home page
├── layout.tsx                      # Root layout
└── globals.css                     # Global styles
```

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## 📊 Three Information Areas

### 1. 🖥️ IT Backend Information
- Development news, tutorials, best practices
- Frameworks, tools, DevOps insights
- **Suggested Sources**: Dev.to, Medium, HashiCorp Blog, GitHub Trending

### 2. 🤖 AI Research & News
- LLM research, model releases
- ML insights, AI safety research
- **Suggested Sources**: ArXiv, OpenAI Blog, Anthropic Blog, Papers with Code

### 3. 📈 US Stock Market
- Real-time stock prices & market status
- Tech stocks (AAPL, MSFT, NVDA, TSLA, etc.)
- **Suggested Sources**: Yahoo Finance, Alpha Vantage, Finnhub, IEX Cloud

## 🔧 How to Add Data Sources

### Step 1: Add scraper function in `app/lib/scraper.ts`

```typescript
export async function fetchITNews() {
  const data = await fetchJSON('https://api.example.com/news');
  return data.map(item => ({
    id: item.id,
    title: item.title,
    source: item.source,
    date: new Date(item.date).toISOString().split('T')[0],
    url: item.url
  }));
}
```

### Step 2: Update section component

Replace mock data in `app/components/sections/IT-section.tsx`:

```typescript
useEffect(() => {
  async function loadNews() {
    try {
      const data = await fetchITNews();
      setNews(data);
    } catch (error) {
      console.error('Failed to load:', error);
      // Keep mock data on error
    }
    setLoading(false);
  }
  loadNews();
}, []);
```

## 📝 Component Reference

### ITSection, AISection, USStockSection
- Render in 3-column grid on desktop
- Show loading spinner while fetching
- Display items in card-like containers
- Include hover effects

### Card Component
```typescript
<Card title="Section Title">
  {/* Your content */}
</Card>
```

## 🎨 Styling Notes

- Dark theme: `bg-slate-900`, `bg-slate-700`, `text-slate-400`
- Primary accent: Blue (`text-blue-400`)
- Secondary accent: Cyan (`text-cyan-400`)
- Success: Green, Error: Red

## 🔄 Real-time Updates

Consider adding auto-refresh:

```typescript
useEffect(() => {
  const interval = setInterval(loadData, 60000); // Every 60s
  return () => clearInterval(interval);
}, []);
```

## 🚢 Deploy to Vercel

```bash
npm install -g vercel
vercel
```

## ✨ Future Enhancements

- [ ] Add real data sources
- [ ] Implement caching (SWR/React Query)
- [ ] Add filters & search
- [ ] Stock charts & graphs
- [ ] Dark/light theme toggle
- [ ] User preferences
- [ ] Export data feature

## 💡 Tips

- Use environment variables for API keys
- Implement error boundaries for robustness
- Consider CORS proxy for client-side requests
- Cache API responses when possible
- Monitor rate limits
