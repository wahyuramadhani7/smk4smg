import { drive } from "@/lib/googleDrive";
import { Readable } from "stream";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File | null;

    if (!file) {
      return Response.json(
        {
          success: false,
          message: "File tidak ditemukan",
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResponse = await drive.files.create({
      requestBody: {
        name: file.name,
        parents: [process.env.GOOGLE_DRIVE_FOLDER_ID!],
      },
      media: {
        mimeType: file.type,
        body: Readable.from(buffer),
      },
      fields: "id,name",
    });

    const fileId = uploadResponse.data.id;

    if (!fileId) {
      throw new Error("Google Drive tidak mengembalikan fileId");
    }

    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    return Response.json({
      success: true,
      fileId,
      url: `https://drive.google.com/file/d/${fileId}/view`,
    });
  } catch (error: any) {
    console.error("UPLOAD ERROR:", error);

    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}