import chalk from "chalk";
import { Module, Logger, ModuleCategory } from "zksync-cli/lib";

import type { ConfigHandler } from "zksync-cli/lib";

// You don't want to save this kind of info to module config
// It's just for testing purposes since this module has no other state
type ModuleConfig = {
  isInstalled?: boolean;
  isRunning?: boolean;
};

export default class SetupModule extends Module<ModuleConfig> {
  constructor(config: ConfigHandler) {
    super(
      {
        name: "Dummy Module",
        description: "Dummy module for testing purposes",
        category: ModuleCategory.Other,
      },
      config
    );
  }

  async isInstalled() {
    return Boolean(this.moduleConfig.isInstalled);
  }
  async install() {
    Logger.info(chalk.greenBright("Dummy module installation... Beep boop..."));
    this.setModuleConfig({
      ...this.moduleConfig,
      isInstalled: true,
    });
  }

  async isRunning() {
    return Boolean(this.moduleConfig.isRunning);
  }
  async start() {
    this.setModuleConfig({
      ...this.moduleConfig,
      isRunning: true,
    });
  }
  getStartupInfo() {
    return [
      {
        text: "I'm a dummy module and here is my info",
        list: [`I'm installed: ${this.moduleConfig.isInstalled}`, `I'm running: ${this.moduleConfig.isRunning}`],
      },
      "Awesome, right?",
    ];
  }

  async getLogs() {
    return ["Sorry, I' a dummy module and I don't have any logs"];
  }

  async update() {
    await this.install();
  }

  async stop() {
    this.setModuleConfig({
      ...this.moduleConfig,
      isRunning: false,
    });
  }

  async clean() {
    await this.stop();
    this.setModuleConfig({
      ...this.moduleConfig,
      isInstalled: false,
    });
  }
}
