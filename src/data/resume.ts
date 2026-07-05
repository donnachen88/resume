// 简历静态数据 — 便于后续替换与维护

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  tags: string;
  heroImages: { src: string; alt: string }[];
}

export interface ContactItem {
  /** lucide-react icon name */
  icon: 'mail' | 'phone' | 'globe' | 'messageCircle';
  text: string;
}

export interface SkillTag {
  name: string;
  highlighted?: boolean;
}

export interface ExperiencePhase {
  label: string;
  descriptions: string[];
  skills: SkillTag[];
}

export interface ExperienceItem {
  company: string;
  position: string;
  period: string;
  phases: ExperiencePhase[]; 
}

export interface EducationItem {
  school: string;
  major: string;
  degree: string;
  period: string;
}

export interface ResumeData {
  profile: Profile;
  contacts: ContactItem[];
  experiences: ExperienceItem[];
  educations: EducationItem[];
}

export const resumeData: ResumeData = {
  profile: {
    name: '陈豆豆',
    role: '产品设计师 / Product Designer',
    tagline: '从问题发现到设计方案，再到前端落地与上线验证',
    tags: '1 年经验 ｜ AI Coding ｜ 视觉交互 ｜ 内容体验',
    heroImages: [
      {
        src: 'https://s41.ax1x.com/2026/07/04/pm0cmp8.jpg',
        alt: '人物肖像',
      },
      {
        src: 'https://s41.ax1x.com/2026/07/04/pm0gGbd.jpg',
        alt: '工作场景',
      },
    ],
  },
  contacts: [
    { icon: 'mail', text: 'Donnachen88@outlook.com' },
    { icon: 'phone', text: '19011291231' },
  ],
  experiences: [
    {
      company: '美团 ｜ 酒店旅行',
      position: 'UI/UX Designer → Product Designer',
      period: '2025.07 - 至今',
      phases: [
        {
          label: '阶段二 · 产品闭环 PDE',
          descriptions: [
            '① 特价机票页面改版SDD',
            '以低价活动专区作为主战场，针对明确节假日建立低价内容和搜索能力，特价搜索首次上线后点击达到40%，支付UV提升65%；',
            'SDD流程中，使用 AI Coding 像素级还原页面细节，缩短项目周期约 2 天工时。',
          ],
          skills: [
            { name: '设计还原', highlighted: true },
            { name: 'AI Coding', highlighted: true },
            { name: '需求分析', highlighted: true },
            { name: 'PRD', highlighted: true },
          ],
        },
        {
          label: '阶段一 · 视觉与交互',
          descriptions: [
            '① 景点门票手绘地图',
            '在优化购票体验的基础上，增加定制化园内地图提升用户在园内场景下游览体验。在项目中作为主 R 负责 icon AI 批量化生图工作流搭建，推动项目顺利进行并落地，地图侧浏览时长提升10%，并接入景区线下游览手册。',
            '② 景点门票deal页优化',
            '景区消费向体验消费转型带动相关商品消费，商品介绍页内容多信息杂。页面优化聚焦结构化信息呈现，提高有效信息露出辅助决策，访购率提升。',
          ],
          skills: [
            { name: 'Figma', highlighted: true },
            { name: 'AI友好设计', highlighted: true },
            { name: 'UI组件库' , highlighted: true},
            { name: '交互', highlighted: true },
          ],
        },
      ],
    },
  ],
  educations: [
    {
      school: '中国美术学院',
      major: '艺术与科技',
      degree: '硕士',
      period: '2022.09 - 2025.06',
    },
    {
      school: '中央美术学院',
      major: '陶瓷产品设计',
      degree: '本科',
      period: '2017.09 - 2021.06',
    },
  ],
};
