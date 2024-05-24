import ArticleCard from "@/components/ArticleCard";
import SectionHeading from "@/components/Home/SectionHeading";
import { createClient } from "@/utils/supabase/server";
import { fetchTableData } from "@/utils/supabase/supabase-utils";
import { redirect } from "next/navigation";
import {
  MdCake,
  MdCottage,
  MdNewspaper,
  MdQuestionMark,
  MdRestaurant,
} from "react-icons/md";
import { Absence, Article } from "../interfaces";
import Section from "@/components/Home/Section";
import EmployeeAbsence from "@/components/EmployeeAbsence";
import CreateAbsence from "@/components/CreateAbsence";
import Birthdays from "@/components/Home/Birthdays";
import { format, getWeek } from "date-fns";
import CanteenMenu from "@/components/Home/CanteenMenu";
import { AnonQuestionForm } from "@/components/AnonQuestionForm";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  }

  const { data } = await supabase
    .from("profiles")
    .select("full_name, id, studio_location")
    .eq("id", user.id)
    .single();

  const newsData = await fetchTableData("news-and-insights");
  const articles = newsData["news"] as Article[];

  const absenceData = await fetchTableData("employee-absence");
  const absence = absenceData["employee_absence"] as Absence[];

  const currentDate = new Date();
  console.log("current date", currentDate);
  const currentWeek = getWeek(currentDate);

  return (
    <>
      <section className="space-y-4">
        <h1 className="font-heading text-step3 lg:text-step6">
          Hello, {data?.full_name}
        </h1>
        <p>Welcome to AKQA Denmark's intranet.</p>
      </section>
      <Section>
        <SectionHeading icon={MdNewspaper} title="News" />
        <div className=" scrollbar-hide flex flex-grow snap-x gap-4 overflow-y-scroll">
          <ArticleCard
            baseSlug="news-and-insights"
            tableName="news"
            className="min-w-[80%] snap-start lg:min-w-[30%]"
            data={articles}
          />
        </div>
      </Section>
      <div className="gap-10 lg:grid lg:grid-cols-2">
        <div>
          <Section>
            <SectionHeading icon={MdCottage} title="Absence">
              <p className="text-lightGray">{format(currentDate, "PPP")}</p>
            </SectionHeading>
            <EmployeeAbsence data={absence} />
            <CreateAbsence tableName="employee-absence" variant="homepage" />
          </Section>
          <Section>
            <SectionHeading icon={MdCake} title="Birthdays">
              <p className="text-lightGray">Week {currentWeek}</p>
            </SectionHeading>
            <Birthdays />
          </Section>
        </div>
        <div>
          <Section>
            <SectionHeading icon={MdQuestionMark} title="Ask Steffen">
              <p className="text-lightGray">
                Ask an anonymous question for Steffen, our Managing Director.
                Steffen will provide an answer at our monthly town hall meeting.
                Anything goes.
              </p>
            </SectionHeading>
            <AnonQuestionForm />
          </Section>
        </div>
      </div>
      <Section>
        <SectionHeading icon={MdRestaurant} title="Canteen Menu">
          <div className="text-lightGray">
            <p>{data?.studio_location}</p>
          </div>
        </SectionHeading>
        <CanteenMenu currentDate={currentDate} />
      </Section>
    </>
  );
}
