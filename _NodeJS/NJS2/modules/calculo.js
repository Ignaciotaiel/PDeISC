// sabemos que usamos 15 partes de agua por cada gramo de cafe
const RATIO_AGUA_POR_CAFE = 15;

// nos dice cuanta agua poner segun los gramos de cafe
export function calcularAguaNecesaria(gramosCafe) {
  return gramosCafe * RATIO_AGUA_POR_CAFE;
}

// hace lo contrario, calcula el cafe segun el agua
export function calcularCafeNecesario(mlAgua) {
  return mlAgua / RATIO_AGUA_POR_CAFE;
}
