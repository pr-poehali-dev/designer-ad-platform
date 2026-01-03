export interface BriefData {
  companyName: string;
  companyWebsite: string;
  contactPerson: string;
  email: string;
  phone: string;
  productName: string;
  productDescription: string;
  productCategory: string;
  targetAudience: string;
  audienceAge: string;
  audienceGender: string;
  campaignGoals: string[];
  budget: string;
  timeline: string;
  preferredPlatforms: string[];
  additionalInfo: string;
}

export const initialBriefData: BriefData = {
  companyName: '',
  companyWebsite: '',
  contactPerson: '',
  email: '',
  phone: '',
  productName: '',
  productDescription: '',
  productCategory: '',
  targetAudience: '',
  audienceAge: '',
  audienceGender: '',
  campaignGoals: [],
  budget: '',
  timeline: '',
  preferredPlatforms: [],
  additionalInfo: ''
};

export const steps = [
  { id: 1, title: 'О компании', icon: 'Building2' },
  { id: 2, title: 'Продукт', icon: 'Package' },
  { id: 3, title: 'Аудитория', icon: 'Users' },
  { id: 4, title: 'Кампания', icon: 'Target' }
];

export const campaignGoalsOptions = [
  { value: 'awareness', label: 'Узнаваемость бренда', icon: 'Eye' },
  { value: 'sales', label: 'Рост продаж', icon: 'TrendingUp' },
  { value: 'traffic', label: 'Трафик на сайт', icon: 'MousePointer' },
  { value: 'engagement', label: 'Вовлечённость', icon: 'Heart' },
  { value: 'leads', label: 'Генерация лидов', icon: 'UserPlus' }
];

export const platformOptions = [
  { value: 'instagram', label: 'Instagram', icon: 'Instagram' },
  { value: 'youtube', label: 'YouTube', icon: 'Youtube' },
  { value: 'tiktok', label: 'TikTok', icon: 'Music' },
  { value: 'telegram', label: 'Telegram', icon: 'Send' },
  { value: 'vk', label: 'VK', icon: 'MessageCircle' }
];
