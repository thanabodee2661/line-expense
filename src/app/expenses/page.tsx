"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faFloppyDisk,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { ExpenseDetail, ExpenseType } from "@/models/expense";
import { ChangeEvent, useContext, useEffect, useState } from "react";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { IsEmpty } from "@/utils/validation";
import axios from "axios";
import ProfileContext from "@/contexts/line";

const MySwal = withReactContent(Swal);

export default function Expenses() {
  const profile = useContext(ProfileContext);
  const typeList: ExpenseType[] = [
    {
      id: "รับ",
      name: "รับ",
    },
    {
      id: "จ่าย",
      name: "จ่าย",
    },
  ];
  const categoryList: ExpenseType[] = [
    {
      id: "",
      name: "-",
    },
    {
      id: "อาหาร",
      name: "อาหาร",
    },
    {
      id: "shopping",
      name: "shopping",
    },
    {
      id: "ประกัน",
      name: "ประกัน",
    },
    {
      id: "อื่นๆ",
      name: "อื่นๆ",
    },
  ];
  const channelList: ExpenseType[] = [
    {
      id: "",
      name: "-",
    },
    {
      id: "เงินสด",
      name: "เงินสด",
    },
    {
      id: "โอน",
      name: "โอน",
    },
    {
      id: "tmn wallet",
      name: "tmn wallet",
    },
    {
      id: "บัตรเครดิต",
      name: "บัตรเครดิต",
    },
  ];

  const current = new Date();
  const initFormDetail: ExpenseDetail = {
    userId: profile?.userId || "",
    userName: profile?.displayName || "",
    date: `${current.getFullYear()}-${("0" + current.getMonth()).slice(-2)}-${(
      "0" + current.getDate()
    ).slice(-2)}`,
    type: `รับ`,
    subDetailList: [
      {
        category: ``,
        description: ``,
        amount: ``,
        channel: ``,
      },
    ],
  };
  const [formDetail, setFormDetail] = useState(initFormDetail);

  useEffect(() => {
    setFormDetail(initFormDetail);
  }, [profile]);

  const handleSubDetailChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    const newSubDetailList = [...formDetail.subDetailList];
    newSubDetailList[index] = { ...newSubDetailList[index], [name]: value };
    setFormDetail({ ...formDetail, subDetailList: newSubDetailList });
  };

  const addSubDetail = () => {
    const newSubDetailList = [
      ...formDetail.subDetailList,
      {
        category: "",
        description: "",
        amount: ``,
        channel: "",
      },
    ];
    setFormDetail((prevFormDetail) => {
      return { ...prevFormDetail, subDetailList: newSubDetailList };
    });
  };

  const removeSubDetail = (index: number) => {
    setFormDetail((prevFormDetail) => {
      const newSubDetailList = prevFormDetail.subDetailList.filter(
        (_, i) => i !== index
      );
      return { ...prevFormDetail, subDetailList: newSubDetailList };
    });
  };

  const save = () => {
    const errMsg = validate();
    const Toast = MySwal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
    });

    if (IsEmpty(errMsg)) {
      axios
        .post(
          "https://script.google.com/macros/s/AKfycbwvcrnyUjHtgllggRwT6eIyzvuEmBgpJKh2xeqDjcIKgVAJh1Ge2HxEifhCBr7bMKLG/exec",
          formDetail,
          {
            headers: {
              "Content-Type": "text/plain;charset=utf-8;",
              Accept: "text/plain;charset=utf-8;",
            },
          }
        )
        .then((res) => {
          console.log(res);
          Toast.fire({
            icon: "success",
            title: "บันทึกสำเร็จ",
            timer: 1500,
          });

          setFormDetail(initFormDetail);
        })
        .catch((err) => console.log(err));
    } else {
      Toast.fire({
        icon: "error",
        title: errMsg,
        timer: 4000,
      });
    }
  };

  const validate = () => {
    if (IsEmpty(formDetail.userId)) {
      return "ไม่สามารถ init profile ได้";
    }

    if (IsEmpty(formDetail.date)) {
      return "กรุณากรอกวันที่";
    }

    if (IsEmpty(formDetail.type)) {
      return "กรุณากรอกประเภท";
    }

    for (const sd of formDetail.subDetailList) {
      if (IsEmpty(sd.category) && IsEmpty(sd.description)) {
        return "กรุณากรอกหมวดหมู่ หรือ รายละเอียด";
      }

      if (IsEmpty(sd.amount)) {
        return "กรุณากรอกจำนวนเงิน";
      }
    }

    return "";
  };

  return (
    <div className="w-full">
      <div className="relative z-30">
        <div className="fixed bottom-20 right-5">
          <button
            className="btn btn-accent rounded-full"
            onClick={addSubDetail}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <div className="fixed bottom-5 right-5">
          <button className="btn btn-primary rounded-full" onClick={save}>
            <FontAwesomeIcon icon={faFloppyDisk} />
          </button>
        </div>
      </div>

      <div className="sticky top-0 w-full backdrop-blur z-10">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">วันที่</span>
          </div>
          <input
            type="date"
            placeholder="วันที่"
            defaultValue={formDetail.date}
            onChange={(e) =>
              setFormDetail({ ...formDetail, date: e.target.value })
            }
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control">
          <div className="label">
            <span className="label-text">ประเภท</span>
          </div>
          <select
            className="select select-bordered"
            defaultValue={formDetail.type}
            onChange={(e) =>
              setFormDetail({ ...formDetail, type: e.target.value })
            }
          >
            {typeList.map((a, i) => (
              <option key={`type${i}`} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {formDetail.subDetailList.map((sd, index) => (
        <div
          key={`subDetailList${index}`}
          className="relative overscroll-contain w-full"
        >
          <details className="collapse bg-base-200 mt-4" open>
            <summary className="collapse-title text-xl font-medium pe-4">
              รายการที่ {index + 1}
              <button
                className={`float-end z-20 ${
                  formDetail.subDetailList.length === 1 ? "hidden" : ""
                }`}
                onClick={() => removeSubDetail(index)}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </summary>
            <div className="collapse-content">
              <label className="form-control">
                <div className="label">
                  <span className="label-text">หมวดหมู่</span>
                </div>
                <select
                  className="select select-bordered"
                  name="category"
                  value={sd.category}
                  onChange={(e) => handleSubDetailChange(index, e)}
                >
                  {categoryList.map((a, i) => (
                    <option key={`cat${i}`} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="form-control">
                <div className="label">
                  <span className="label-text">รายละเอียด</span>
                </div>
                <input
                  type="text"
                  name="description"
                  placeholder="รายละเอียด"
                  value={sd.description}
                  onChange={(e) => handleSubDetailChange(index, e)}
                  className="input input-bordered w-full"
                />
              </label>
              <label className="form-control">
                <div className="label">
                  <span className="label-text">จำนวนเงิน</span>
                </div>
                <input
                  type="number"
                  name="amount"
                  placeholder="จำนวนเงิน"
                  value={sd.amount}
                  onChange={(e) => handleSubDetailChange(index, e)}
                  className="input input-bordered w-full"
                />
              </label>
              <label className="form-control">
                <div className="label">
                  <span className="label-text">ช่องทางชำระเงิน</span>
                </div>
                <select
                  className="select select-bordered"
                  name="channel"
                  value={sd.channel}
                  onChange={(e) => handleSubDetailChange(index, e)}
                >
                  {channelList.map((a, i) => (
                    <option key={`ch${i}`} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </details>
        </div>
      ))}
    </div>
  );
}
