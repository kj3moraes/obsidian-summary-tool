import SummaryTool from "./main";
import {
	ButtonComponent,
	DropdownComponent,
	Notice,
	PluginSettingTab,
	Setting,
	TextAreaComponent,
	TextComponent,
} from "obsidian";

export default class SettingsView extends PluginSettingTab {
	constructor(private plugin: SummaryTool) {
		super(plugin.app, plugin);
	}

	display() {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl("h1", { text: "GPT-3 Settings" });

		new Setting(containerEl)
			.setName("OpenAI API Key")
			.setDesc("The token generated in your OpenAI dashboard.")
			.addText((text: TextComponent) => {
				text.setPlaceholder("Token")
					.setValue(this.plugin.settings.token || "")
					.onChange((change: any) => {
						this.plugin.settings.token = change;
						this.plugin.saveSettings();
					});
			})
			.addButton((button: ButtonComponent) => {
				button.setButtonText("Generate token");
				button.onClick((evt: MouseEvent) => {
					window.open("https://beta.openai.com/account/api-keys");
				});
			});
	}
}
