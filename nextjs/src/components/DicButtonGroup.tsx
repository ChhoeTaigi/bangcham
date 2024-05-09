"use client";

import * as React from "react";
import { getDictionaryByName } from "@/app/_isomorphic/Dictionary";

export default function DicButtonGroup({ dictNameList }) {
	const [selectedName, setSelectedName] = React.useState(dictNameList[0]);
	function toggleDic({
		currentTarget,
	}) {
		const dicName = currentTarget.getAttribute('data-dic-name');
		setSelectedName(dicName);
		const domNode = document.getElementById(`dic-${dicName}`);
		const topPosition =
			document.getElementById("site-header").offsetHeight +
			document.getElementById("dic-button-group").offsetHeight;
		window.scrollTo(0, domNode.offsetTop - topPosition);
	}
	return (
		<React.Fragment>
			{dictNameList.map((dicName) => (
				<button
					key={dicName}
					className={"btn " + (selectedName === dicName ? "active" : "")}
					data-dic-name={dicName}
					onClick={toggleDic}
				>
					{getDictionaryByName(dicName).chineseName}
				</button>
			))}
		</React.Fragment>
	);
}
