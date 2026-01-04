import connectDB from "@/lib/database/database";
import ClientModel from "@/lib/database/Model/Client";
import { Mail, Phone, Languages } from "lucide-react";

const ClientPart = async ({
  clientName,
  clientId,
}: {
  clientName: string;
  clientId: string;
}) => {
  try {
    await connectDB();

    const data = await ClientModel.findOne({ clientId: clientId })
      .populate("clientId", "name email")
      .lean();

    console.log(data);

    const handleInitial = () => {
      const data = clientName.split(" ").map((e: string) => {
        return e.split("")[0].toUpperCase();
      });
      console.log(data);
      return data;
    };

    return (
      <div className=" max-w-8/12 grid grid-cols-[1fr_2fr] comp-bg rounded-md mt-4 p-2">
        <div className="border-r border-r-amber-300 grid gap-2 place-items-center p-2">
          <div className="w-32 h-32 rounded-full text-4xl ele-bg border-2 border-amber-300 flex justify-center items-center">
            {handleInitial()}
          </div>

          <h4>{clientName}</h4>
        </div>

        <div className="grid grid-cols-2">
          <div className="grid gap-4  pl-4">
            <div>
              <label>Contact Info</label>
              <div className="flex gap-4 mt-2">
                <Mail size={18} />
                <div>{data.clientId.email}</div>
              </div>
              <div className="flex gap-4">
                <Phone size={18} />
                <div>{data.phone}</div>
              </div>
            </div>

            <div>
              <label>Languages</label>
              <div className="flex gap-4 mt-2">
                <Languages size={18} />
                <div>
                  {data?.languages?.length > 0
                    ? data.languages
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
