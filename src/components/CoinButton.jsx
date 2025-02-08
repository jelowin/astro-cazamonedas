import {useState} from 'react'
import { toast } from "@pheralb/toast"
import {turso} from '../../turso.js'

export default function CoinButton({ existsInUserCoins, userCookieId, coinId }) {
  const [hasCoin, setHasCoin] = useState(existsInUserCoins)

  const handleAddCoin = async () => {
    try {
      await turso.execute(
        "INSERT INTO user_coins (user_id, coin_id) VALUES (?, ?)",
        [userCookieId, coinId],
      );
      setHasCoin(true)
      toast.success({
        text: "Añadida a tu colección",
      })
    } catch (error) {
      toast.error({
        text: "Ha habido un error",
        description: error.message
      })
    }
  };

  const handleRemoveCoin = async () => {
    try {
      await turso.execute(
        "DELETE FROM user_coins WHERE user_id = ? AND coin_id = ?",
        [userCookieId, coinId],
      );
      setHasCoin(false)
      toast.success({
        text: "Eliminada de tu colección",
      })
    } catch (error) {
      toast.error({
        text: "Ha habido un error",
        description: error.message
      })
    }
  };

  return (
    <>
      {hasCoin ? (<button
        className="w-full p-2 rounded-md text-white bg-red-400 hover:bg-rose-700"
        onClick={handleRemoveCoin}
      >
        Eliminar
      </button>) : (<button
        className="w-full p-2 rounded-md text-white bg-blue-400 hover:bg-sky-700"
        onClick={handleAddCoin}
      >
        Añadir
      </button>)}
    </>
  )
}
