import { SplitAmount } from "./SplitAmoun";
import { Summary } from "../Summary";

export function Settlement() {
  return (
    <main className="grid md:grid-cols-3 gap-10">
      <section className="border border-gray-dark">
        <SplitAmount />
      </section>
      <section className="border border-gray-dark">
        <p>Avatar Group</p>
      </section>
      <section className="border border-gray-dark">
        <Summary className="text-xl font-normal" />
      </section>
      <section className="border border-gray-dark md:col-span-3">
        <p>Settlement List</p>
      </section>
    </main>
  );
}
