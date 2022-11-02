/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import Api from "../tools/api";

import {compose, length, lt, gt, prop, match, allPass, all, modulo, ifElse, tap, otherwise, andThen} from "ramda";

const api = new Api();

const getValue = prop("value");
const getWriteLog = prop("writeLog");
const getHandleSuccess = prop("handleSuccess");
const getHandleError = prop("handleError");
const getResult = prop("result");

const lessThanTen = gt(10);
const moreThanTwo = lt(2);
const isPositive = lt(0);
const isFloat = match(/^[0-9]*\.?[0-9]*$/);

const validateLength = compose(allPass([lessThanTen, moreThanTwo]), length);

const validateInput = compose(
  allPass([validateLength, isPositive, isFloat]),
  getValue
);

const square = (num) => Math.pow(num, 2);
const moduloThree = (num) => modulo(num, 3);

const parseInput = compose(Math.round, parseFloat, getValue);
const convert = api.get("https://api.tech/numbers/base");
const convertToBin = (num) => convert({ from: 10, to: 2, number: num });
const getAnimalById = (id) => api.get(`https://animals.tech/${id}`)({});

const logError = (obj) => getHandleError(obj)("ValidationError");

const processSequence = (obj) => {
  const writeLog = getWriteLog(obj);
  const handleSuccess = getHandleSuccess(obj);
  const logValue = compose(writeLog, getValue);

  compose(
    ifElse(
      validateInput,
      compose(
        otherwise(logError),
        andThen(handleSuccess),
        andThen(getResult),
        andThen(getAnimalById),
        andThen(tap(writeLog)),
        andThen(moduloThree),
        andThen(tap(writeLog)),
        andThen(square),
        andThen(tap(writeLog)),
        andThen(length),
        andThen(tap(writeLog)),
        andThen(getResult),
        convertToBin,
        tap(writeLog),
        parseInput
      ),
      tap(logError)
    ),
    tap(logValue)
  )(obj);
};

export default processSequence;
