/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

import {
  all,
  allPass,
  anyPass,
  compose,
  equals,
  filter,
  gte,
  length,
  not,
  prop,
  values,
} from "ramda";

const isWhite = equals("white");
const isRed = equals("red");
const isGreen = equals("green");
const isBlue = equals("blue");
const isOrange = equals("orange");

const getStar = prop("star");
const getSquare = prop("square");
const getTriangle = prop("triangle");
const getCircle = prop("circle");

const isRedStar = compose(isRed, getStar);
const isWhiteStar = compose(isWhite, getStar);
const isWhiteSquare = compose(isWhite, getSquare);
const isGreenSquare = compose(isGreen, getSquare);
const isWhiteTriangle = compose(isWhite, getTriangle);
const isWhiteCircle = compose(isWhite, getCircle);
const isBlueCircle = compose(isBlue, getCircle);
const isOrangeSquare = compose(isOrange, getSquare);
const isGreenTriangle = compose(isGreen, getTriangle);
const isNotRedStar = compose(not, isRedStar);
const isNotWhiteStar = compose(not, isWhiteStar);
const isNotWhiteSquare = compose(not, isWhiteSquare);

const orangeNum = compose(length, filter(isOrange), values);
const redNum = compose(length, filter(isRed), values);
const greenNum = compose(length, filter(isGreen), values);
const blueNum = compose(length, filter(isBlue), values);

const isOne = (number) => equals(number, 1);
const isTwo = (number) => equals(number, 2);
const isGte2 = (number) => gte(number, 2);
const isGte3 = (number) => gte(number, 3);
const redNumEqualsBlueNum = (obj) => equals(blueNum(obj), redNum(obj));

const allOranges = all(isOrange);
const allGreens = all(isGreen);

const greenGte3 = compose(isGte3, greenNum);
const redGte3 = compose(isGte3, redNum);
const blueGte3 = compose(isGte3, blueNum);
const orangeGte3 = compose(isGte3, orangeNum);
const gte3SameColor = anyPass([greenGte3, redGte3, blueGte3, orangeGte3]);

const isOneRed = compose(isOne, redNum);
const TwoGreens = compose(isTwo, greenNum);
const minTwoGreens = compose(isGte2, greenNum);

const TriAndSqSameColor = (obj) => equals(getSquare(obj), getTriangle(obj));

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([
  isWhiteCircle,
  isGreenSquare,
  isWhiteTriangle,
  isRedStar,
]);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = minTwoGreens;

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = redNumEqualsBlueNum;

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([
  isBlueCircle,
  isRedStar,
  isOrangeSquare,
]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = gte3SameColor;

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = allPass([isGreenTriangle, TwoGreens, isOneRed]);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = compose(allOranges, values);

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = allPass([isNotWhiteStar, isNotRedStar]);

// 9. Все фигуры зеленые.
export const validateFieldN9 = compose(allGreens, values);

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = allPass([isNotWhiteSquare, TriAndSqSameColor]);
