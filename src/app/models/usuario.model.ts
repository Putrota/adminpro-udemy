
export class Usuario {


    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public img?: string,
        public role?: string,
        public google?: boolean,
        public _id?: string,
        // A partir del primer opcional, todos tienen que serlo
    ) { }


}
