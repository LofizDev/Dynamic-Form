import { useState } from "react";
import { allIngredients } from "./Ingredients";
import { motion, AnimatePresence } from "framer-motion";
import DynamicForm from "../dynamic-form/DynamicForm";

export default function Tabs() {
    const [selectedTab, setSelectedTab] = useState(allIngredients[0]);
    return (
        <div className="window">
            <nav>
                <ul className="tabs-list">
                    {allIngredients.map((item) => (
                        <li
                            key={item.label}
                            className={item === selectedTab ? "selected" : ""}
                            onClick={() => setSelectedTab(item)}
                        >
                            {`${item.label}`}
                            {item === selectedTab ? (
                                <motion.div className="underline" layoutId="underline" />
                            ) : null}
                        </li>
                    ))}
                </ul>
            </nav>
            <main>
                <AnimatePresence exitBeforeEnter>
                    <motion.div
                        key={selectedTab ? selectedTab.label : "empty"}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="content-form">
                            <DynamicForm />
                        </div>
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
}
