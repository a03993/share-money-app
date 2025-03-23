import { AvatarGroup } from "./AvatarGroup";
import { SplitAmount } from "./SplitAmount";
import { Summary } from "../Summary";

export function Settlement() {
  return (
    <main className="grid gap-5 md:grid-cols-3 md:gap-10">
      <section>
        <SplitAmount />
      </section>
      <section className="flex justify-center items-center">
        <AvatarGroup />
      </section>
      <section>
        <Summary className="gap-5" inSettlement />
      </section>
      <section className="border border-gray-dark md:col-span-3">
        <p>Settlement List</p>
      </section>
    </main>
  );
}
