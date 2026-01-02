import * as z from "zod";

export type AuthUserSchema = z.input<typeof authUserSchema>;
export const authUserSchema = z.object({
  password: z.string(),
});

export type AuthSchema = z.input<typeof authSchema>;
export const authSchema = z.object({
  secretKey: z.string(),
  users: z.record(z.string(), authUserSchema),
});

export type DocumentSchema = z.input<typeof documentSchema>;
export const documentSchema = z.object({
  head: z.string(),
});

export type BrandingSchema = z.input<typeof brandingSchema>;
export const brandingSchema = z
  .object({
    hideFooter: z.string(),
    customFooter: z.string(),
    logoText: z.string(),
    logoUrl: z.string(),
    faviconUrl: z.string(),
    appName: z.string(),
    appIconUrl: z.string(),
    appBackgroundColor: z.string(),
  })
  .transform((schema) => ({
    ...schema,
    ["hide-footer"]: schema.hideFooter,
    ["custom-footer"]: schema.customFooter,
    ["logo-text"]: schema.logoText,
    ["logo-url"]: schema.logoUrl,
    ["favicon-url"]: schema.faviconUrl,
    ["app-name"]: schema.appName,
    ["app-icon-url"]: schema.appIconUrl,
    ["app-background-color"]: schema.appBackgroundColor,
  }));

export type ThemeSchema = z.input<typeof themeSchema>;
export const themeSchema = z
  .object({
    backgroundColor: z.string(),
    contrastMultiplier: z.number(),
    customCssFile: z.string(),
    disablePicker: z.boolean(),
    light: z.boolean(),
    primaryColor: z.string(),
    textSaturationMultiplier: z.number(),
    presets: z.record(
      z.string(),
      z
        .object({
          backgroundColor: z.string(),
          negativeColor: z.string(),
          positiveColor: z.string(),
          primaryColor: z.string(),
        })
        .transform((schema) => ({
          ["background-color"]: schema.backgroundColor,
          ["negative-color"]: schema.negativeColor,
          ["positive-color"]: schema.positiveColor,
          ["primary-color"]: schema.primaryColor,
        })),
    ),
  })
  .transform((schema) => ({
    ...schema,
    ["background-color"]: schema.backgroundColor,
    ["contrast-multiplier"]: schema.contrastMultiplier,
    ["custom-css-file"]: schema.customCssFile,
    ["disable-picker"]: schema.disablePicker,
    ["primary-color"]: schema.primaryColor,
    ["text-saturation-multiplier"]: schema.textSaturationMultiplier,
  }));

export type WidgetsSchema = z.input<typeof widgetsSchema>;
export const widgetsSchema = z.object({});

export type ColumnsSchema = z.input<typeof columnsSchema>;
export const columnsSchema = z.object({
  size: z.enum(["small", "full"]),
  widgets: z.array(widgetsSchema).optional(),
});

export type PageSchema = z.input<typeof pageSchema>;
export const pageSchema = z
  .object({
    centerVertically: z.boolean().default(false),
    columns: z.array(columnsSchema),
    desktopNavigationWidth: z.string().optional(),
    headWidgets: z.array(widgetsSchema).optional(),
    widgets: z.array(widgetsSchema).optional(),
    hideDesktopNavigation: z.boolean().default(false),
    name: z.string().min(1),
    showMobileHeader: z.boolean().default(false),
    slug: z.string().optional(),
    width: z.string().optional(),
  })
  .transform((schema) => ({
    ...schema,
    ["center-vertically"]: schema.centerVertically,
    ["desktop-navigation-width"]: schema.desktopNavigationWidth,
    ["head-widgets"]: schema.headWidgets,
    ["hide-desktop-navigation"]: schema.hideDesktopNavigation,
    ["show-mobile-header"]: schema.showMobileHeader,
    ["slug"]: schema.slug || "/" + schema.name.replace(/\s/g, "-"),
  }));

export type GlobalSchema = z.input<typeof globalSchema>;
export const globalSchema = z.object({
  auth: authSchema.optional(),
  branding: brandingSchema.optional(),
  document: documentSchema.optional(),
  pages: z.array(pageSchema),
  theme: themeSchema.optional(),
});
