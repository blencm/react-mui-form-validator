import component from "./core/validator/ValidatorComponent";
import form from "./core/validator/ValidatorForm";
import field from "./components/TextValidator";
import select from "./components/SelectValidator";

exports.TextFieldValidator = field;
exports.SelectValidator = select;
exports.ComponentValidator = component;
exports.FormValidator = form;
