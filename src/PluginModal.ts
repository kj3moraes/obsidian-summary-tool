import SummaryTool from "./main";
import {
	ButtonComponent,
	DropdownComponent,
	ToggleComponent,
	MarkdownView,
	Modal,
	Notice,
	Setting,
	TextAreaComponent,
} from "obsidian";

export class PluginModal extends Modal {
    constructor(
        plugin: any
    ) {
        super(plugin.app);
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.setText("This is a modal!");
    }
}