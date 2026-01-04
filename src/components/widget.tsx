import * as widgets from "./widgets";

export function Widget<T extends keyof typeof widgets>(
  props: React.ComponentProps<(typeof widgets)[T]>,
) {
  const WidgetComponent = widgets[props.type];
  return <WidgetComponent {...props} />;
}
