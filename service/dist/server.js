"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = express_1.default();
app.use(body_parser_1.default.json());
// get questions
app.get('/questions', (req, res) => {
    res.send('Hello world!');
});
// answer question
app.post('/question', (req, res) => {
    req.body;
});
app.listen(4000);
//# sourceMappingURL=server.js.map