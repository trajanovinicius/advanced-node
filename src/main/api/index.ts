import "../config/module-alias";
import { PersonController } from "../../application/controllers/person.js";

const p = new PersonController();
console.log(p.speak("rodrigo"));
console.log(p.speak());
