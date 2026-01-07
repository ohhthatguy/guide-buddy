import connectDB from "@/lib/database/database";

import { Mail, Phone, Languages } from "lucide-react";

const ClientPart = async ({
  name,
  email,
  phone,
  url,
  languages,
}: {
  name: string;
  email: string;
  phone: number;
  url: string;
  languages: string[];
}) => {
  try {
    await connectDB();

    // let data;

    // console.log(role);
    // console.log(tourID);

    // if (role == "customer") {
    //   //customer ma guide done
    //   data = await TourModel.findOne({ _id: tourID })
    //     .populate({
    //       path: "guide.id",
    //       select: "phone languages profileURL",
    //       populate: {
    //         path: "guideId",
    //         select: "email",
    //       },
    //     })
    //     .lean();
    // } else {
    //   //guide ma customer baki
    //   data = await TourModel.findOne({ _id: tourID })
    //     .populate({
    //       path: "client.id",
    //       select: "phone languages profileURL",
    //       populate: {
    //         path: "clientId",
    //         select: "email",
    //       },
    //     })
    //     .lean();
    // }

    // console.log(data);
    // const k = data?.guide.id?._id.toString();
    // console.log(k);

    // const name = role === "guide" ? data?.client.name : data?.guide.name;
    // const email =
    //   role === "guide"
    //     ? data?.client.id?.clientId.email
    //     : data?.guide.id?.guideId.email;

    // const phone =
    //   role === "guide" ? data?.client.id.phone : data?.guide.id?.phone;
    // const url =
    //   role === "guide"
    //     ? data?.client.id.profileURL
    //     : data?.guide.id?.profileURL;
    // const languages =
    //   role === "guide" ? data?.client.id.languages : data?.guide.id?.languages;

    const handleInitial = (name: string) => {
      const data = name.split(" ").map((e: string) => {
        return e.split("")[0].toUpperCase();
      });
      console.log(data);
      return data;
    };
    console.log("URL: ", url);

    return (
      <div className="  grid grid-cols-[1fr_2fr] comp-bg rounded-md mt-4 p-2">
        <div className="border-r border-r-amber-300 grid gap-2 place-items-center p-2">
          <div className="w-32 h-32 rounded-full text-4xl ele-bg border-2 border-amber-300 flex justify-center items-center">
            {handleInitial(name)}
          </div>

          <h4>{name}</h4>
        </div>

        <div className="grid grid-cols-2">
          <div className="grid gap-4  pl-4">
            <div>
              <label>Contact Info</label>
              <div className="flex gap-4 mt-2">
                <Mail size={18} />
                <div>{email}</div>
              </div>
              <div className="flex gap-4">
                <Phone size={18} />
                <div>{phone}</div>
              </div>
            </div>

            <div>
              <label>Languages</label>
              <div className="flex gap-4 mt-2">
                <Languages size={18} />
                <div>
                  {languages?.length > 0
                    ? languages
                        .map((e: string) => {
                          return e.charAt(0).toUpperCase() + e.slice(1);
                        })
                        .join(", ")
                    : "Langauge selected not found"}
                </div>
              </div>
            </div>
          </div>

          {/* asd */}

          <div>
            <label>Last Experience</label>
            <p className="italic mt-2">"his review"</p>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.log("ERROR IN CLIENT PART IN GUIDE SIDE: ", error);
  }
};

export default ClientPart;
