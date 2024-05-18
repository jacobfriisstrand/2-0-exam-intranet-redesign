import React from "react";
import { Profile } from "@/app/interfaces";
import Image from "next/image";

type Props = {
  data: Profile[];
};

const EmployeeCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="grid gap-10 lg:grid-cols-2 xxl:grid-cols-3">
      {data.map((employee, index) => (
        <article
          className="grid gap-5 text-balance lg:grid-cols-2"
          key={employee.id}
        >
          <div className="relative aspect-[3/4] size-full h-full">
            {employee.avatar_url && (
              <Image
                style={{ objectFit: "cover" }}
                src={employee.avatar_url}
                alt={employee.full_name}
                placeholder="blur"
                blurDataURL={employee.avatar_url}
                {...(index < 3 ? { priority: true } : {})}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
              />
            )}
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-5 lg:grid-cols-1 lg:gap-3">
            <div>
              <p className="text-lightGray">Name</p>
              <p>{employee.full_name}</p>
            </div>
            <div>
              <p className="text-lightGray">Position</p>
              <p>{employee.current_position}</p>
            </div>
            <div>
              <p className="text-lightGray">Studio Location</p>
              <p>{employee.studio_location}</p>
            </div>
            <div>
              <p className="text-lightGray">Email</p>
              <a className="underline" href={`mailto:${employee.email}`}>
                {employee.email}
              </a>
            </div>
            <div>
              <p className="text-lightGray">Phone</p>
              <a className="underline" href={`tel:${employee.phone}`}>
                {employee.phone}
              </a>
            </div>
            <div>
              <p className="text-lightGray">Birthday</p>
              <p>{employee.birthday.toString()}</p>
            </div>
            <div className="col-span-2 lg:col-span-1">
              <p className="text-lightGray">Skills</p>
              <p>{employee.skills}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default EmployeeCard;
