import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

const bloggers = [
  {
    id: 1,
    name: 'Анна Петрова',
    niche: 'lifestyle',
    audience: 850000,
    engagement: 8.5,
    price: 150000,
    avatar: '👩‍💼',
    platforms: ['Instagram', 'YouTube', 'TikTok'],
    verified: true
  },
  {
    id: 2,
    name: 'Максим Соколов',
    niche: 'tech',
    audience: 1200000,
    engagement: 6.2,
    price: 250000,
    avatar: '👨‍💻',
    platforms: ['YouTube', 'Telegram'],
    verified: true
  },
  {
    id: 3,
    name: 'Екатерина Волкова',
    niche: 'beauty',
    audience: 650000,
    engagement: 12.3,
    price: 120000,
    avatar: '💄',
    platforms: ['Instagram', 'TikTok'],
    verified: true
  },
  {
    id: 4,
    name: 'Дмитрий Новиков',
    niche: 'fitness',
    audience: 420000,
    engagement: 9.1,
    price: 85000,
    avatar: '💪',
    platforms: ['Instagram', 'YouTube'],
    verified: false
  },
  {
    id: 5,
    name: 'София Лебедева',
    niche: 'travel',
    audience: 980000,
    engagement: 7.8,
    price: 180000,
    avatar: '✈️',
    platforms: ['Instagram', 'YouTube', 'Telegram'],
    verified: true
  },
  {
    id: 6,
    name: 'Артем Козлов',
    niche: 'food',
    audience: 530000,
    engagement: 10.5,
    price: 95000,
    avatar: '🍳',
    platforms: ['Instagram', 'TikTok'],
    verified: true
  }
];

const niches = [
  { value: 'all', label: 'Все ниши', icon: 'Grid' },
  { value: 'lifestyle', label: 'Лайфстайл', icon: 'Sparkles' },
  { value: 'tech', label: 'Технологии', icon: 'Laptop' },
  { value: 'beauty', label: 'Бьюти', icon: 'Heart' },
  { value: 'fitness', label: 'Фитнес', icon: 'Dumbbell' },
  { value: 'travel', label: 'Путешествия', icon: 'Plane' },
  { value: 'food', label: 'Еда', icon: 'UtensilsCrossed' }
];

const portfolioCases = [
  {
    id: 1,
    brand: 'TechBrand Pro',
    blogger: 'Максим Соколов',
    result: '+340% продаж',
    views: '2.5M',
    gradient: 'gradient-purple'
  },
  {
    id: 2,
    brand: 'BeautyLux',
    blogger: 'Екатерина Волкова',
    result: '+520% охват',
    views: '1.8M',
    gradient: 'gradient-orange'
  },
  {
    id: 3,
    brand: 'FitLife',
    blogger: 'Анна Петрова',
    result: '+280% конверсия',
    views: '3.2M',
    gradient: 'gradient-blue'
  }
];

export default function Index() {
  const [selectedNiche, setSelectedNiche] = useState('all');
  const [budgetRange, setBudgetRange] = useState([50000, 300000]);
  const [audienceRange, setAudienceRange] = useState([100000, 1500000]);

  const filteredBloggers = bloggers.filter(blogger => {
    const nicheMatch = selectedNiche === 'all' || blogger.niche === selectedNiche;
    const budgetMatch = blogger.price >= budgetRange[0] && blogger.price <= budgetRange[1];
    const audienceMatch = blogger.audience >= audienceRange[0] && blogger.audience <= audienceRange[1];
    return nicheMatch && budgetMatch && audienceMatch;
  });

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  return (
    <div className="min-h-screen">
      <header className="border-b bg-white/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-purple flex items-center justify-center text-white text-xl font-bold">
              B
            </div>
            <span className="text-2xl font-bold text-gradient">BloggerAds</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-foreground/80 hover:text-foreground transition-colors">Главная</a>
            <a href="#bloggers" className="text-foreground/80 hover:text-foreground transition-colors">Блогеры</a>
            <a href="#portfolio" className="text-foreground/80 hover:text-foreground transition-colors">Портфолио</a>
          </nav>
          <Button className="gradient-purple border-0">
            <Icon name="LogIn" size={16} className="mr-2" />
            Войти
          </Button>
        </div>
      </header>

      <section id="home" className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 gradient-purple opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6 animate-scale-in">
              <Icon name="TrendingUp" size={16} className="text-primary" />
              <span className="text-sm font-semibold text-primary">Платформа №1 для рекламы у блогеров</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              Реклама у блогеров <br />
              <span className="text-gradient">за 5 минут</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Найдите идеального блогера для вашего бренда. Прозрачные цены, проверенные инфлюенсеры, гарантия результата
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="gradient-purple border-0 text-lg px-8 h-14 hover:scale-105 transition-transform">
                <Icon name="Search" size={20} className="mr-2" />
                Найти блогера
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 h-14 hover:scale-105 transition-transform">
                <Icon name="Play" size={20} className="mr-2" />
                Как это работает
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-gradient mb-2">2500+</div>
                <div className="text-sm text-muted-foreground">Блогеров</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gradient mb-2">15M+</div>
                <div className="text-sm text-muted-foreground">Охват</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gradient mb-2">98%</div>
                <div className="text-sm text-muted-foreground">Довольных</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="bloggers" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Каталог <span className="text-gradient">блогеров</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Используйте умные фильтры для поиска идеального инфлюенсера
            </p>
          </div>

          <Card className="mb-8 border-2 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="SlidersHorizontal" size={24} className="text-primary" />
                Фильтры поиска
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-semibold mb-3 block">Ниша</label>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
                  {niches.map(niche => (
                    <Button
                      key={niche.value}
                      variant={selectedNiche === niche.value ? 'default' : 'outline'}
                      className={`w-full ${selectedNiche === niche.value ? 'gradient-purple border-0' : ''}`}
                      onClick={() => setSelectedNiche(niche.value)}
                    >
                      <Icon name={niche.icon as any} size={16} className="mr-1" />
                      {niche.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold mb-3 block flex items-center gap-2">
                    <Icon name="Wallet" size={16} />
                    Бюджет: {formatNumber(budgetRange[0])} - {formatNumber(budgetRange[1])} ₽
                  </label>
                  <Slider
                    min={50000}
                    max={300000}
                    step={10000}
                    value={budgetRange}
                    onValueChange={setBudgetRange}
                    className="mt-2"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold mb-3 block flex items-center gap-2">
                    <Icon name="Users" size={16} />
                    Аудитория: {formatNumber(audienceRange[0])} - {formatNumber(audienceRange[1])}
                  </label>
                  <Slider
                    min={100000}
                    max={1500000}
                    step={50000}
                    value={audienceRange}
                    onValueChange={setAudienceRange}
                    className="mt-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBloggers.map((blogger, index) => (
              <Card 
                key={blogger.id} 
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-full gradient-purple flex items-center justify-center text-3xl">
                        {blogger.avatar}
                      </div>
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {blogger.name}
                          {blogger.verified && (
                            <Icon name="BadgeCheck" size={18} className="text-primary" />
                          )}
                        </CardTitle>
                        <CardDescription className="capitalize">{blogger.niche}</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Icon name="Users" size={14} />
                      Аудитория
                    </span>
                    <span className="font-bold">{formatNumber(blogger.audience)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Icon name="TrendingUp" size={14} />
                      Вовлечённость
                    </span>
                    <span className="font-bold text-primary">{blogger.engagement}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Icon name="Wallet" size={14} />
                      Стоимость
                    </span>
                    <span className="font-bold text-lg">{formatNumber(blogger.price)} ₽</span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {blogger.platforms.map(platform => (
                      <Badge key={platform} variant="secondary" className="text-xs">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full gradient-purple border-0 group">
                    Заказать рекламу
                    <Icon name="ArrowRight" size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredBloggers.length === 0 && (
            <div className="text-center py-16">
              <Icon name="SearchX" size={64} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-2xl font-bold mb-2">Блогеры не найдены</h3>
              <p className="text-muted-foreground">Попробуйте изменить параметры фильтров</p>
            </div>
          )}
        </div>
      </section>

      <section id="portfolio" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Портфолио <span className="text-gradient">успеха</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Реальные кейсы наших клиентов с впечатляющими результатами
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {portfolioCases.map((caseItem, index) => (
              <Card 
                key={caseItem.id} 
                className="border-0 overflow-hidden hover:scale-105 transition-transform duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className={`h-32 ${caseItem.gradient} flex items-center justify-center text-white`}>
                  <Icon name="TrendingUp" size={48} className="animate-float" />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{caseItem.brand}</CardTitle>
                  <CardDescription>с {caseItem.blogger}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">Результат</span>
                      <span className="font-bold text-primary text-lg">{caseItem.result}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">Просмотры</span>
                      <span className="font-bold">{caseItem.views}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-8 md:p-12 text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Готовы запустить вашу кампанию?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Присоединяйтесь к сотням брендов, которые уже получили результаты с BloggerAds
            </p>
            <Button size="lg" className="gradient-purple border-0 text-lg px-10 h-14 hover:scale-105 transition-transform">
              <Icon name="Rocket" size={20} className="mr-2" />
              Начать сейчас
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-foreground/5 border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-purple flex items-center justify-center text-white text-xl font-bold">
                B
              </div>
              <span className="text-xl font-bold text-gradient">BloggerAds</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">О нас</a>
              <a href="#" className="hover:text-foreground transition-colors">Контакты</a>
              <a href="#" className="hover:text-foreground transition-colors">Блог</a>
              <a href="#" className="hover:text-foreground transition-colors">Поддержка</a>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2026 BloggerAds. Все права защищены
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
