export class Todo {
    _id?: string;
    timestamp?: number;
    state?: boolean;
    constructor(
        public title: string,
        public description: string,
    ) { }
}
