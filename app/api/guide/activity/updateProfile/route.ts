import { NextRequest, NextResponse } from "next/server";
import GuideModel from "@/lib/database/Model/Guide";
import connectDB from "@/lib/database/database";

await connectDB();

// export async function PATCH(req: NextRequest) {
//   try {
//     const reqBody = await req.json();

//     const updateQuery = await GuideModel.findOneAndUpdate(
//       { _id: reqBody._id },
//       { $set: reqBody },
//     );

//     if (!updateQuery) {
//       return NextResponse.json(
//         { msg: "error in updating the guide profile" },
//         { status: 500 },
//       );
//     }

//     return NextResponse.json(
//       { msg: "Sucessfully updated the guide profile", reqBody, updateQuery },
//       { status: 200 },
//     );
//   } catch (error) {
//     console.log("Error in backend while guide profile: ");
//     return NextResponse.json(
//       { msg: "Error in backend while guide profile: ", error },
//       { status: 500 },
//     );
//   }
// }

export async function PATCH(req: NextRequest) {
  try {
    const { _id, ...updateData } = await req.json(); // Separate _id from the rest

    if (!_id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const updatedGuide = await GuideModel.findOneAndUpdate(
      { _id: _id },
      { $set: updateData }, // Only set the fields that AREN'T _id
      {
        new: true, // Returns the UPDATED document
        runValidators: true, // Ensures the new data still passes your Zod/Mongoose rules
      },
    );

    if (!updatedGuide) {
      return NextResponse.json({ error: "Guide not found" }, { status: 404 });
    }

    return NextResponse.json(updatedGuide, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
