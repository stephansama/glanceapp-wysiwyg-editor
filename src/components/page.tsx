import { Container, Item, Slot } from "./swapy";
import { Clock } from "./widgets";

export function Page() {
  return (
    <Container className="grid gap-8 grid-cols-12">
      <>
        <div className="grid col-span-3">
          <Slot swapyKey="a">
            <Item swapyKey="a">
              <Clock />
            </Item>
          </Slot>
        </div>
        <div className="grid col-span-6">
          <Slot swapyKey="b">
            <Item swapyKey="b">
              <div className="h-40 w-full flex rounded-md items-center justify-center bg-red-400">
                b
              </div>
            </Item>
          </Slot>
        </div>
        <div className="grid col-span-3">
          <Slot swapyKey="c">
            <Item swapyKey="c">
              <div className="h-40 w-full rounded-md flex items-center justify-center bg-red-400">
                c
              </div>
            </Item>
          </Slot>
        </div>
      </>
    </Container>
  );
}
