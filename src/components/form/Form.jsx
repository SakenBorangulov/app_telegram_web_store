import { useCallback, useEffect, useState } from "react";
import "./form.css";
import { useTelegram } from "../../hooks/useTelegram";

const Form = () => {
  const [country, setCountry] = useState("")
  const [city, setCity] = useState("")
  const [subject, setSubject] = useState("physical")
  const { tg } = useTelegram()

  const onSendData = useCallback(() => {
    const data = {
      country,
      city,
      subject
    }
    tg.sendData(JSON.stringify(data))
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country, city, subject])

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData)
    return () => {
      tg.offEvent("mainButtonClicked", onSendData)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSendData])

  useEffect(() => {
    tg.MainButton.setParams({
      text: "Send credentials"
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if(!city || !country) {
      tg.MainButton.hide()
    } else {
      tg.MainButton.show()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, country])

  const onChangeCountry = (e) => {
    setCountry(e.target.value)
  }
  const onChangeCity = (e) => {
    setCity(e.target.value)
  }
  const onChangeSubject = (e) => {
    setSubject(e.target.value)
  }


  return (
    <div className="form">
      <h3>Enter your credentials</h3>
      <input className="input" type="text" placeholder="country" value={country} onChange={onChangeCountry} />
      <input className="input" type="text" placeholder="city" value={city} onChange={onChangeCity}/>
      <select className="select" value={subject} onChange={onChangeSubject}>
        <option value="physical">Natural person</option>
        <option value="legal">Legal entity</option>
      </select>
    </div>
  );
};

export default Form;
