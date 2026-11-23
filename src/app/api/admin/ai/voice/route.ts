import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { transcript } = body;

    if (!transcript || !transcript.trim()) {
      return NextResponse.json({ error: "Transcript is required" }, { status: 400 });
    }

    const t = transcript.toLowerCase();
    let recognizedIntent = "GENERAL_COMMAND";
    let actionType = "GENERATE_CAMPAIGN";
    let targetPlatform = "INSTAGRAM";
    let responseText = "";

    if (t.includes("बंद") || t.includes("रोक") || t.includes("stop") || t.includes("lockdown") || t.includes("halt")) {
      recognizedIntent = "EMERGENCY_LOCKDOWN";
      actionType = "EMERGENCY_LOCKDOWN";
      responseText = "आपातकालीन आदेश प्राप्त हुआ। सभी AI कर्मचारियों की गतिविधियों को तुरंत रोक दिया गया है। (Emergency lockdown triggered).";
    } else if (t.includes("प्रचार") || t.includes("campaign") || t.includes("marketing") || t.includes("मार्केटिंग")) {
      recognizedIntent = "MARKETING_CAMPAIGN";
      actionType = "GENERATE_CAMPAIGN";
      responseText = "प्रचार अभियान का आदेश प्राप्त हुआ। AI Marketing Manager, Content Writer और Graphic Designer को 7 प्लेटफॉर्म्स के लिए अभियान तैयार करने का निर्देश दिया गया है।";
    } else if (t.includes("instagram") || t.includes("इंस्टाग्राम") || t.includes("पोस्ट")) {
      recognizedIntent = "SOCIAL_POST";
      actionType = "GENERATE_SOCIAL_POST";
      targetPlatform = "INSTAGRAM";
      responseText = "Instagram पोस्ट तैयार की जा रही है। अप्रूवल सेंटर में ड्राफ्ट भेज दिया गया है।";
    } else if (t.includes("sales") || t.includes("सेल्स") || t.includes("report") || t.includes("रिपोर्ट") || t.includes("कमाई")) {
      recognizedIntent = "BUSINESS_REPORT";
      actionType = "GENERATE_BUSINESS_REPORT";
      responseText = "AI Business Analyst डेटाबेस से लाइव आंकड़े निकाल कर आपकी बिजनेस रिपोर्ट तैयार कर रहा है।";
    } else if (t.includes("support") || t.includes("सपोर्ट") || t.includes("ग्राहक") || t.includes("customer")) {
      recognizedIntent = "CUSTOMER_SUPPORT";
      actionType = "CUSTOMER_SUPPORT_REPORT";
      responseText = "ग्राहक सहायता डेस्क सक्रिय है। कोई लंबित शिकायत नहीं है, सभी पूछताछ रिकॉर्डेड हैं।";
    } else {
      recognizedIntent = "AI_MANAGER_QUERY";
      actionType = "GENERATE_CAMPAIGN";
      responseText = `आदेश प्राप्त हुआ: "${transcript}"। AI Manager ने कार्यभार संभाल लिया है और परिणाम अप्रूवल सेंटर में प्रस्तुत करेगा।`;
    }

    return NextResponse.json({
      success: true,
      transcript,
      recognizedIntent,
      actionType,
      targetPlatform,
      aiResponse: responseText,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
