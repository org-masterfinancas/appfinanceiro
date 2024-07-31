export default class Duracao {
    static duracaoDe(segundos: number) {
        return Math.floor(segundos / 60) + 'm'
    }
}