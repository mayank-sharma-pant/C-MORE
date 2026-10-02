import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = { title: "Terms" };

const blocks = [
  {
    title: "When a booking is firm",
    body: "A reservation is not firm until the deposit reaches the company’s bankers. By sending it, you agree to these terms. The deposit amount is confirmed in writing by the office. It is not refunded if you cancel, but it may be applied to another trip taken within 18 months. It is not transferable to another person.",
  },
  {
    title: "How the balance is paid",
    body: "On confirmation, a deposit equal to 50% of the tour price is sent by bank transfer or card, with a copy to the New Delhi office. The remaining 50% is due at least 35 days before the tour starts. Inside 35 days, the full amount is required. For group travel, luxury resorts, luxury trains, and the peak months of December to February, 100% is required at least 90 days before travel.",
  },
  {
    title: "Changing the dates",
    body: "Travel dates may be changed up to 35 days before departure without a penalty. A change or transfer inside that window carries a 10% administration charge. After that, a change is treated as a cancellation.",
  },
  {
    title: "Cancellation",
    body: "Charges are a percentage of the total tour price, counted from the day the written confirmation and deposit are received. Up to 35 days before arrival: 10%. From 34 days to 10 days: 40%. Less than 10 days: 65%. On the day the tour starts: 100%, with no refund. All disputes are subject to the courts in Delhi.",
  },
  {
    title: "What the office is responsible for",
    body: "C More acts as agent for hotels, transport owners, and local operators. It is not responsible for extra services a guest arranges privately with a guide or driver outside the confirmed plan, nor for terrorism, political unrest, earthquake, landslide, or a cancelled flight or cruise. After full payment, the company takes the gain or loss of later changes in airfare, currency, park fees, taxes, or fuel surcharges. Suggested hotels depend on availability; a similar category is offered if the named hotel has gone.",
  },
  {
    title: "Passports, visas, and small costs",
    body: "Have a valid passport and visa at least 20 days before entry. After the deposit, the office can send an invitation letter to support a visa application. If the route includes another country, check that country’s visa rules yourself. Tips, long-distance calls, and room service are not included unless the programme says so. Payments from foreign nationals are by card or by bank wire to the New Delhi account, with a confirmation copy sent to the office.",
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Terms"
        title="How a booking is held."
        lede="This is the policy published on the current C More site, set out so it can be read."
        image="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1800&q=80"
      />
      <section className="section">
        <div className="wrap max-w-3xl space-y-10">
          {blocks.map((block) => (
            <article key={block.title}>
              <h2 className="text-3xl">{block.title}</h2>
              <p className="mt-3 text-muted">{block.body}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
