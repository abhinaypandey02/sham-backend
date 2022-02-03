import {generateID} from '../utils/global';
import config from "../utils/config.json";
test("verify room code length",()=>{
    const regex=new RegExp('\\w{'+config.room_code_size+'}');
    expect(generateID()).toMatch(regex)
})