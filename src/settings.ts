// 定义路由名称常量
const ROUTE_NAMES = [
  "home",
  "publish",
  "imgWall",
  "about",
  "workspace"
] as const;

// 定义国际化选项
const I18N_OPTIONS = ["zh_CN", "en_US"] as const;

// 使用映射类型将数组中的每个元素映射为联合类型
type TypeRouteName = (typeof ROUTE_NAMES)[number];

// 定义国际化文本类型
export type TypeI18nTexts = {
  [key in TypeRouteName]: {
    [key in (typeof I18N_OPTIONS)[number]]: string
  };
};

export type TypeI18nOps = (typeof I18N_OPTIONS)[number];

// 定义国际化文本
const I18N_TEXTS: TypeI18nTexts = {
  "home": {
    "zh_CN": "首页",
    "en_US": "Home",
  },
  "publish": {
    "zh_CN": "发布",
    "en_US": "Publish"
  },
  "imgWall": {
    "zh_CN": "图片墙",
    "en_US": "ImgWall"
  },
  "about": {
    "zh_CN": "关于",
    "en_US": "About"
  },
  "workspace": {
    "zh_CN": "工作区",
    "en_US": "Workspace"
  }
};

// 使用提取的路由名称常量
export const widgets = {
  comp: {
    headbox: {
      routes: ROUTE_NAMES
    }
  }
};

// 使用提取的国际化文本
export const i18n = {
  comp: {
    headbox: {
      routes: I18N_TEXTS
    }
  },

  lang: I18N_OPTIONS

};
