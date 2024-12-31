import { useCallback, useEffect, useRef, useState } from "react";
import { isKeyboardCodeAllowed } from "../util/helper";

const useTypings = (enabled) => {
    const [cursor, setCursor] = useState(0);
    const [typed, setTyped] = useState("");
    const totalTyped = useRef(0);

    const keydownHandler = useCallback(
        (e) => {
            const { key, code } = e;

            // تعطيل التمرير عند الضغط على مفتاح المسافة
            if (key === " " || key === "Spacebar") {
                e.preventDefault(); // منع التمرير
            }

            // عدم السماح بالإدخال إذا كانت الكتابة غير مفعلّة أو الكود غير مسموح
            if (!enabled || !isKeyboardCodeAllowed(code)) {
                return;
            }

            switch (key) {
                case "Backspace":
                    setTyped((prev) => prev.slice(0, -1));
                    setCursor((cursor) => cursor - 1);
                    totalTyped.current -= 1;
                    break;
                default:
                    setTyped((prev) => prev.concat(key));
                    setCursor((cursor) => cursor + 1);
                    totalTyped.current += 1;
            }
        },
        [enabled]
    );

    const clearTyped = useCallback(() => {
        setTyped("");
        setCursor(0);
    }, []);

    const resetTotalTyped = useCallback(() => {
        totalTyped.current = 0;
    }, []);

    // إضافة المستمع للحدث keydown
    useEffect(() => {
        window.addEventListener("keydown", keydownHandler);

        // تنظيف الحدث عند مغادرة المكون
        return () => {
            window.removeEventListener("keydown", keydownHandler);
        };
    }, [keydownHandler]);

    return {
        typed,
        cursor,
        clearTyped,
        resetTotalTyped,
        totalTyped: totalTyped.current,
    };
};

export default useTypings;
