{pkgs}: {
  channel = "stable-23.11";
  packages = [
    pkgs.nodejs_20
    pkgs.yarn
    pkgs.nodePackages.pnpm
    pkgs.bun
  ];
  idx.extensions = [
    
  ];
  idx.workspace = {
      # Runs when a workspace is first created with this `dev.nix` file
      onCreate = {
        npm-install = "npm ci --no-audit --prefer-offline --no-progress --timing";
        # Open editors for the following files by default, if they exist:
        default.openFiles = [
          # Cover all the variations of language, src-dir, router (app/pages)
          "pages/index.tsx" "pages/index.jsx"
          "src/pages/index.tsx" "src/pages/index.jsx"
          "app/page.tsx" "app/page.jsx"
          "src/app/page.tsx" "src/app/page.jsx"
        ];
      };
      # To run something each time the workspace is (re)started, use the `onStart` hook
    };
  idx.previews = {
    previews = {
      web = {
        command = [
          "npm"
          "run"
          "dev"
          "--"
          "--port"
          "$PORT"
          "--hostname"
          "0.0.0.0"
        ];
        manager = "web";
      };
    };
  };
}