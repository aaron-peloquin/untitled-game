import { randomName } from "@helper"

export default function handler(req, res) {
    const name = randomName()
    res.status(200).json({ name })
}