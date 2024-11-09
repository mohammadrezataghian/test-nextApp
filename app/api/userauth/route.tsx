import { NextResponse} from "next/server";
import axios from "axios";

export async function GET(){
     try {
      const response= await axios.get("https://66f7f9772a683ce9730e4bd7.mockapi.io/userauth")
      return NextResponse.json(response.data)  
     } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
     }
}