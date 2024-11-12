import { NextResponse} from "next/server";
import axios from "axios";

export async function GET(){
     try {
      const response= await axios.get("https://673347a82a1b1a4ae112e83f.mockapi.io/cards")
      return NextResponse.json(response.data)  
     } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
     }
}