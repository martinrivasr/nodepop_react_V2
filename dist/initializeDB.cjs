"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
var axios_1 = require("axios");
dotenv.config();
var API_BASE_URL = process.env.VITE_API_BASE_URL || "http://localhost:3001/api";
// Lista de usuarios que vamos a crear
var users = [
    { email: "useruario11d@example.com", name: "User11d", password: "1234", username: "User11d" },
    { email: "useruario12@example.com", name: "User12", password: "1234", username: "User12" },
    { email: "useruario13@example.com", name: "User13", password: "1234", username: "User13" },
    { email: "useruario14@example.com", name: "User14", password: "1234", username: "User14" },
    { email: "useruario15@example.com", name: "User15", password: "1234", username: "User15" },
    { email: "useruario16@example.com", name: "User16", password: "1234", username: "User16" },
    { email: "useruario17@example.com", name: "User17", password: "1234", username: "User17" },
    { email: "useruario18@example.com", name: "User18", password: "1234", username: "User18" },
    { email: "useruario19@example.com", name: "User19", password: "1234", username: "User19" },
    { email: "useruario19a@example.com", name: "User19a", password: "1234", username: "User19a" },
];
// Lista de productos de ejemplo
var productNames = [
    "Laptop", "TV", "Mobile", "Cama", "Tablet", "Escritorio", "Silla", "Lámpara",
    "Monitor", "Reloj", "Bicicleta", "Mochila", "Teléfono", "Cámara", "Impresora",
    "Auriculares", "Ventilador", "Microondas", "Cafetera", "Tostadora"
];
var tags = ["work", "lifestyle", "motor", "mobile"];
// Función para generar productos aleatorios
var getRandomProducts = function (min, max) {
    var numProducts = Math.floor(Math.random() * (max - min + 1)) + min;
    return Array.from({ length: numProducts }).map(function () {
        var randomName = productNames[Math.floor(Math.random() * productNames.length)];
        var randomTags = tags.slice(0, Math.floor(Math.random() * tags.length) + 1);
        return {
            name: randomName,
            sale: Math.random() > 0.5,
            price: Math.floor(Math.random() * 2000) + 1,
            tags: randomTags,
        };
    });
};
// Función principal para inicializar la API
function initializeAPI() {
    return __awaiter(this, void 0, void 0, function () {
        var i, user, loginResponse, token, minProducts, maxProducts, products, _i, products_1, product, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 10, , 11]);
                    console.log("Inicializando la base de datos mediante la API...");
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < users.length)) return [3 /*break*/, 9];
                    user = users[i];
                    console.log("usuario a crear", user);
                    // 1️⃣ Crear usuario
                    return [4 /*yield*/, axios_1.default.post("".concat(API_BASE_URL, "/auth/signup"), user)];
                case 2:
                    // 1️⃣ Crear usuario
                    _a.sent();
                    console.log("Usuario creado: ".concat(user.email));
                    return [4 /*yield*/, axios_1.default.post("".concat(API_BASE_URL, "/auth/login"), {
                            email: user.email,
                            password: user.password,
                        })];
                case 3:
                    loginResponse = _a.sent();
                    token = loginResponse.data.accessToken;
                    console.log("Token generado para ".concat(user.email, ": ").concat(token));
                    minProducts = void 0, maxProducts = void 0;
                    if (i < 5) {
                        minProducts = 1;
                        maxProducts = 3;
                    }
                    else if (i < 8) {
                        minProducts = 14;
                        maxProducts = 20;
                    }
                    else {
                        minProducts = 30;
                        maxProducts = 30;
                    }
                    // 4️⃣ Crear productos para este usuario
                    console.log("productos minimos", minProducts);
                    products = getRandomProducts(minProducts, maxProducts);
                    console.log("productos", products);
                    _i = 0, products_1 = products;
                    _a.label = 4;
                case 4:
                    if (!(_i < products_1.length)) return [3 /*break*/, 7];
                    product = products_1[_i];
                    return [4 /*yield*/, axios_1.default.post("".concat(API_BASE_URL, "/v1/adverts"), product, {
                            headers: { Authorization: "Bearer ".concat(token) },
                        })];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 4];
                case 7:
                    console.log("Productos creados para ".concat(user.email, ": ").concat(products.length));
                    _a.label = 8;
                case 8:
                    i++;
                    return [3 /*break*/, 1];
                case 9:
                    console.log("✅ Inicialización completada correctamente.");
                    return [3 /*break*/, 11];
                case 10:
                    error_1 = _a.sent();
                    if (error_1.response) {
                        console.error("🔴 Status:", error_1.response.status);
                        console.error("📄 Data:", JSON.stringify(error_1.response.data, null, 2));
                        console.error("📌 Headers:", JSON.stringify(error_1.response.headers, null, 2));
                    }
                    else if (error_1.request) {
                        console.error("🔴 No hubo respuesta de la API.");
                    }
                    else {
                        console.error("🔴 Error en el código:", error_1.message);
                    }
                    return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    });
}
initializeAPI();
