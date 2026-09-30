import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { InquiryForm } from "@/components/inquiry-form";

export const metadata: Metadata = { title: "MICE" };

export default function MicePage() {
  return (
    <>
      <PageHero
        eyebrow="MICE · New Delhi"
        title="Incentives, with someone on the ground until the last night."
        lede="Palaces, desert safaris, Himalayan camps, and dinners that can be classical dance or a quiet room. The programme is written to the budget you actually have."
        image="https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1800&q=80"
      />
      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5 text-lg text-muted">
            <p>
              India’s lure as an incentive destination has been growing steadily: a multi-experience country, the hospitality of the people, and destination managers who plan carefully and price for value. C More specialises in that work.
            </p>
            <p>
              A programme can include jeep or camel safaris in the Thar, a trek in the Aravalli hills, camping in the Himalaya, and spa or Ayurveda in the north or the south. Evenings run from Bharatanatyam to a jazz night, from a royal feast to a bazaar hour. Heritage palaces and forts turned into hotels are the rooms, when the budget allows.
            </p>
            <p>
              Whether you need a live band, a cocktail and dance evening, or a theme dinner for VIP guests, the office writes it into the same plan. Give the headcount, the dates, and the tone. Multilingual staff stay with the programme and supervise each stage rather than handing you to a stranger in the next city.
            </p>
          </div>
          <InquiryForm interest="MICE programme" />
        </div>
      </section>
    </>
  );
}
