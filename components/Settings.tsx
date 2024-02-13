"use client";

// Settings.tsx
import { useAppDispatch, useAppSelector } from "@/app/store";
import {
  setApiKey,
  setUpsreamUrl,
  setSystemPrompt,
} from "@/app/store/slices/authSlice";
import { setIsJumpToReference } from "@/app/store/slices/stateSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useLocalStorage } from "react-use";
import { useTranslation } from "@/app/i18n/client";

const Settings = ({ lng }: { lng: string }) => {
  //i18n
  const { t } = useTranslation(lng);
  const CONFIG_OPTIONS = [
    {
      name: t("configurations.cocopilot-gpt4"),
      apiKey: "_pXVxLPBzcvCjSvG0Mv4K7G9ffw3xsM2ZKolZ",
      upstreamUrl: "https://proxy.cocopilot.org",
    },
    {
      name: t("configurations.deepseek-chat"),
      apiKey: "sk-ffe19ebe9fa44d00884330ff1c18cf82",
      upstreamUrl: "https://api.deepseek.com",
    },
    {
      name: t("configurations.caifree"),
      apiKey: "sk-aiHrrRLYUUelHstX69E9484509254dBf92061d6744FfFaD1",
      upstreamUrl: "https://one.caifree.com",
    },
    {
      name: t("configurations.custom"),
      apiKey: "",
      upstreamUrl: "",
    },
  ];
  //redux
  const dispatch = useAppDispatch();
  const apiKey = useAppSelector((state) => state.auth.apiKey);
  const upstreamUrl = useAppSelector((state) => state.auth.upsreamUrl);
  const systemPrompt = useAppSelector((state) => state.auth.systemPrompt);
  const isJumpToReference = useAppSelector(
    (state) => state.state.isJumpToReference
  );
  //state
  const [userConfigNumber, setUserConfigNumber] = useLocalStorage(
    "userConfigNumber",
    "2"
  );

  const toggleSwitch = () => {
    dispatch(setIsJumpToReference(!isJumpToReference));
  };
  return (
    <div className="max-w-md rounded overflow-hidden shadow-lg bg-blue-gray-100 z-1000  mx-auto ">
      <h1 className="font-bold text-3xl">settings</h1>
      <br />
      <div className="flex justify-end mt-4 mr-4">
        <Link href="/" aria-label="Settings">
          <FontAwesomeIcon
            icon={faArrowLeft}
            size="2x"
            className="icon-hover"
          />
        </Link>
      </div>
      {/* 配置选择器 */}
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="config-selector"
      >
        {t("配置选择器")}
      </label>
      <select
        id="config-selector"
        className="mb-4 block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        onChange={(event) => {
          const selectedConfig = CONFIG_OPTIONS[Number(event.target.value)];
          dispatch(setApiKey(selectedConfig.apiKey));
          dispatch(setUpsreamUrl(selectedConfig.upstreamUrl));
          setUserConfigNumber(event.target.value);
          console.log("userConfigNumber", userConfigNumber);
        }}
        value={userConfigNumber}
      >
        {CONFIG_OPTIONS.map((option, index) => (
          <option key={index} value={index}>
            {option.name}
          </option>
        ))}
      </select>
      {/* api key */}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="api-key"
        >
          API Key:
        </label>
        <input
          id="api-key"
          type="password"
          value={apiKey}
          onChange={(event) => dispatch(setApiKey(event.target.value))}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {/* upstream-url */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="upstream-url"
          >
            {t("Upstream URL:")}
          </label>
          <input
            id="upstream-url"
            type="text"
            value={upstreamUrl}
            onChange={(event) => dispatch(setUpsreamUrl(event.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* systemPrompt */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="system-prompt"
          >
            {t("System Prompt(Paper2AI):")}
          </label>
          <textarea
            id="system-prompt"
            value={systemPrompt}
            onChange={(event) => dispatch(setSystemPrompt(event.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={8}
          />
        </div>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={isJumpToReference}
          onChange={toggleSwitch}
        />
        <div className="w-10 h-4 bg-gray-200 rounded-full peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 transition-colors ease-in-out duration-200"></div>
        <span
          className={`absolute block bg-white w-3 h-3 rounded-full transition ease-in-out duration-200 transform ${
            isJumpToReference ? "translate-x-6" : "translate-x-1"
          } -translate-y-1/2 top-1/2`}
        ></span>
        {t("鼠标点击段落中的上标跳转到文献引用？")}
      </label>
    </div>
  );
};

export default Settings;
