interface SectionHeadingProps {
  icon: React.ElementType;
  title: string;
  children?: React.ReactNode;
}

export default function SectionHeading(props: SectionHeadingProps) {
  return (
    <>
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <props.icon className="size-4 text-accent" />
          <h1 className="font-heading text-step1  lg:text-step3">
            {props.title}
          </h1>
        </div>
        {props.children}
      </div>
    </>
  );
}
