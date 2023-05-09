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
    TextComponent,
} from "obsidian";

export class PluginModal extends Modal {
    url: string | null;
    pdf_file: string | null;

    promptField: TextComponent;

    generateButton: ButtonComponent;
    cancelButton: ButtonComponent;
    
    constructor(
        plugin: any
    ) {
        super(plugin.app);
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.setText("Summarize and generate notes from URLs and PDFs.");

        // Input Container
        const container = contentEl.createDiv();
		container.className = "st_plugin-container";

        // URL Input 
        this.promptField = new TextComponent(container);
        this.promptField.inputEl.placeholder = "Enter URL link";
		this.promptField.inputEl.className = "st_url_input";
        
        // PDF Input

        // Button Container 
        const buttonContainer = container.createDiv();
		buttonContainer.className = "st_button-container";

		const cancelButton = new ButtonComponent(buttonContainer);
		cancelButton.buttonEl.className = "st_cancel-button";
		cancelButton.buttonEl.style.backgroundColor = "#b33939";
		cancelButton.setButtonText("Cancel").onClick(() => {
			this.close();
		});

		this.generateButton = new ButtonComponent(buttonContainer);
		this.generateButton.buttonEl.className = "st_generate-button";
		this.generateButton.buttonEl.style.backgroundColor = "#218c74";
		this.generateButton.setButtonText("Generate Notes").onClick(() => {
			this.generateButton.setButtonText("Loading...");
			this.generateButton.setDisabled(true);
			this.generateButton.buttonEl.style.backgroundColor =
				"rbga(33, 140, 116, 0.5)";
			// TODO: Add code for this function => this.handleGenerateClick();
		});
    }
}