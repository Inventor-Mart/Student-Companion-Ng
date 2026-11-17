package com.studentcompanion.app;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.res.AssetManager;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.webkit.CookieManager;
import android.webkit.GeolocationPermissions;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.browser.customtabs.CustomTabColorSchemeParams;
import androidx.browser.customtabs.CustomTabsClient;
import androidx.browser.customtabs.CustomTabsIntent;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.webkit.WebViewAssetLoader;
import java.io.IOException;
import java.io.InputStream;
import java.util.Locale;
import org.json.JSONObject;

public class MainActivity extends AppCompatActivity {
    private static final String VIRTUAL_ORIGIN = "https://appassets.androidplatform.net";
    private static final String START_URL = VIRTUAL_ORIGIN + "/index.html";
    private static final String AUTH_SCHEME = "studentcompanion";
    private static final String AUTH_HOST = "auth-callback";
    private static final int LOCATION_PERMISSION_REQUEST_CODE = 1001;

    private final Handler mainHandler = new Handler(Looper.getMainLooper());
    private WebView webView;
    private WebViewAssetLoader assetLoader;
    private boolean pageFinished = false;
    private boolean pendingCustomTabAuth = false;
    @Nullable
    private String pendingAuthCallbackJson = null;
    @Nullable
    private Runnable cancelCheckRunnable = null;
    @Nullable
    private GeolocationPermissions.Callback pendingGeoCallback;
    @Nullable
    private String pendingGeoOrigin;

    private class AndroidAuthBridge {
        @JavascriptInterface
        public boolean isAvailable() {
            return true;
        }

        @JavascriptInterface
        public void startGoogleSignIn(String authUrl) {
            mainHandler.post(() -> launchGoogleAuthCustomTab(authUrl));
        }

        @JavascriptInterface
        public void cancelGoogleSignIn() {
            mainHandler.post(() -> {
                pendingCustomTabAuth = false;
                if (cancelCheckRunnable != null) {
                    mainHandler.removeCallbacks(cancelCheckRunnable);
                    cancelCheckRunnable = null;
                }
            });
        }
    }

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        assetLoader = new WebViewAssetLoader.Builder()
            .setDomain("appassets.androidplatform.net")
            .addPathHandler("/", new OfflineWwwPathHandler(this))
            .build();

        webView = new WebView(this);
        webView.setBackgroundColor(Color.parseColor("#0B1526"));
        setContentView(webView);

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setGeolocationEnabled(true);
        settings.setJavaScriptCanOpenWindowsAutomatically(true);
        settings.setAllowFileAccess(false);
        settings.setAllowContentAccess(true);
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);
        settings.setMediaPlaybackRequiresUserGesture(false);
        settings.setUseWideViewPort(true);
        settings.setLoadWithOverviewMode(true);

        CookieManager.getInstance().setAcceptCookie(true);
        CookieManager.getInstance().setAcceptThirdPartyCookies(webView, true);

        webView.addJavascriptInterface(new AndroidAuthBridge(), "StudentCompanionAndroid");

        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onGeolocationPermissionsShowPrompt(String origin, GeolocationPermissions.Callback callback) {
                boolean hasFine = ContextCompat.checkSelfPermission(MainActivity.this, Manifest.permission.ACCESS_FINE_LOCATION)
                    == PackageManager.PERMISSION_GRANTED;
                boolean hasCoarse = ContextCompat.checkSelfPermission(MainActivity.this, Manifest.permission.ACCESS_COARSE_LOCATION)
                    == PackageManager.PERMISSION_GRANTED;
                if (hasFine || hasCoarse || Build.VERSION.SDK_INT < Build.VERSION_CODES.M) {
                    callback.invoke(origin, true, false);
                } else {
                    pendingGeoCallback = callback;
                    pendingGeoOrigin = origin;
                    ActivityCompat.requestPermissions(
                        MainActivity.this,
                        new String[] {
                            Manifest.permission.ACCESS_FINE_LOCATION,
                            Manifest.permission.ACCESS_COARSE_LOCATION
                        },
                        LOCATION_PERMISSION_REQUEST_CODE
                    );
                }
            }
        });
        webView.setWebViewClient(new WebViewClient() {
            @Nullable
            @Override
            public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                return assetLoader.shouldInterceptRequest(request.getUrl());
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                pageFinished = true;
                if (pendingAuthCallbackJson != null) {
                    String payload = pendingAuthCallbackJson;
                    pendingAuthCallbackJson = null;
                    deliverAuthCallbackToWebView(payload);
                }
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                Uri uri = request.getUrl();
                String scheme = uri.getScheme();
                String host = uri.getHost();
                if (AUTH_SCHEME.equalsIgnoreCase(scheme) && AUTH_HOST.equalsIgnoreCase(host)) {
                    handleAuthCallbackUri(uri);
                    return true;
                }
                if ("appassets.androidplatform.net".equalsIgnoreCase(host)) {
                    return false;
                }
                if (host != null && host.contains("paystack")) {
                    return false;
                }
                if (host != null && (host.contains("accounts.google.com") || host.contains("firebaseapp.com"))) {
                    launchGoogleAuthCustomTab(uri.toString());
                    return true;
                }
                try {
                    startActivity(new Intent(Intent.ACTION_VIEW, uri));
                    return true;
                } catch (Exception ignored) {
                    return false;
                }
            }
        });

        handleIntent(getIntent());
        webView.loadUrl(START_URL);
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        handleIntent(intent);
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (pendingCustomTabAuth) {
            if (cancelCheckRunnable != null) {
                mainHandler.removeCallbacks(cancelCheckRunnable);
            }
            cancelCheckRunnable = () -> {
                if (pendingCustomTabAuth) {
                    pendingCustomTabAuth = false;
                    if (webView != null && pageFinished) {
                        webView.evaluateJavascript(
                            "window.__handleApkGoogleAuthCancelled && window.__handleApkGoogleAuthCancelled();",
                            null
                        );
                    }
                }
            };
            mainHandler.postDelayed(cancelCheckRunnable, 650);
        }
    }

    private void launchGoogleAuthCustomTab(String rawUrl) {
        if (rawUrl == null || rawUrl.trim().isEmpty()) {
            return;
        }
        Uri authUri = Uri.parse(rawUrl);
        pendingCustomTabAuth = true;
        if (cancelCheckRunnable != null) {
            mainHandler.removeCallbacks(cancelCheckRunnable);
            cancelCheckRunnable = null;
        }

        try {
            CustomTabColorSchemeParams colorParams = new CustomTabColorSchemeParams.Builder()
                .setToolbarColor(Color.parseColor("#101C34"))
                .setSecondaryToolbarColor(Color.parseColor("#0C172B"))
                .build();

            CustomTabsIntent.Builder builder = new CustomTabsIntent.Builder()
                .setDefaultColorSchemeParams(colorParams)
                .setShowTitle(true);

            CustomTabsIntent customTabsIntent = builder.build();
            String customTabsPkg = CustomTabsClient.getPackageName(this, null);
            if (customTabsPkg != null && !customTabsPkg.isEmpty()) {
                customTabsIntent.intent.setPackage(customTabsPkg);
            }
            customTabsIntent.launchUrl(this, authUri);
        } catch (Exception customTabError) {
            try {
                Intent browserIntent = new Intent(Intent.ACTION_VIEW, authUri);
                browserIntent.addCategory(Intent.CATEGORY_BROWSABLE);
                startActivity(browserIntent);
            } catch (Exception browserError) {
                pendingCustomTabAuth = false;
                try {
                    JSONObject errJson = new JSONObject();
                    errJson.put("error", "Unable to launch Chrome browser for Google Sign-In.");
                    deliverAuthCallbackToWebView(errJson.toString());
                } catch (Exception ignored) {
                }
            }
        }
    }

    private void handleIntent(@Nullable Intent intent) {
        if (intent == null) return;
        Uri data = intent.getData();
        if (data != null && AUTH_SCHEME.equalsIgnoreCase(data.getScheme()) && AUTH_HOST.equalsIgnoreCase(data.getHost())) {
            handleAuthCallbackUri(data);
        }
    }

    private void handleAuthCallbackUri(@NonNull Uri uri) {
        pendingCustomTabAuth = false;
        if (cancelCheckRunnable != null) {
            mainHandler.removeCallbacks(cancelCheckRunnable);
            cancelCheckRunnable = null;
        }

        String idToken = uri.getQueryParameter("id_token");
        String state = uri.getQueryParameter("state");
        String error = uri.getQueryParameter("error");

        if ((idToken == null || idToken.isEmpty()) && uri.getFragment() != null) {
            Uri fragmentUri = Uri.parse("https://localhost/?" + uri.getFragment());
            if (idToken == null || idToken.isEmpty()) idToken = fragmentUri.getQueryParameter("id_token");
            if (state == null || state.isEmpty()) state = fragmentUri.getQueryParameter("state");
            if (error == null || error.isEmpty()) error = fragmentUri.getQueryParameter("error");
        }

        try {
            JSONObject payload = new JSONObject();
            if (idToken != null) payload.put("idToken", idToken);
            if (state != null) payload.put("state", state);
            if (error != null) payload.put("error", error);
            deliverAuthCallbackToWebView(payload.toString());
        } catch (Exception ignored) {
        }
    }

    private void deliverAuthCallbackToWebView(@NonNull String jsonPayload) {
        mainHandler.post(() -> {
            if (webView == null || !pageFinished) {
                pendingAuthCallbackJson = jsonPayload;
                return;
            }
            webView.evaluateJavascript(
                "window.__handleApkGoogleAuthCallback && window.__handleApkGoogleAuthCallback(" + jsonPayload + ");",
                null
            );
        });
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == LOCATION_PERMISSION_REQUEST_CODE && pendingGeoCallback != null && pendingGeoOrigin != null) {
            boolean granted = false;
            for (int result : grantResults) {
                if (result == PackageManager.PERMISSION_GRANTED) {
                    granted = true;
                    break;
                }
            }
            pendingGeoCallback.invoke(pendingGeoOrigin, granted, false);
            pendingGeoCallback = null;
            pendingGeoOrigin = null;
        }
    }

    private static class OfflineWwwPathHandler implements WebViewAssetLoader.PathHandler {
        private final AssetManager assets;

        OfflineWwwPathHandler(Context context) {
            this.assets = context.getAssets();
        }

        @Nullable
        @Override
        public WebResourceResponse handle(@NonNull String path) {
            String cleanPath = path.startsWith("/") ? path.substring(1) : path;
            if (cleanPath.isEmpty()) {
                cleanPath = "index.html";
            }
            if (cleanPath.startsWith("api/")) {
                return null;
            }

            InputStream stream = openAsset("www/" + cleanPath);
            String resolvedPath = cleanPath;

            if (stream == null && !hasFileExtension(cleanPath)) {
                resolvedPath = "index.html";
                stream = openAsset("www/index.html");
            }

            if (stream == null) {
                return null;
            }

            return new WebResourceResponse(getMimeType(resolvedPath), "UTF-8", stream);
        }

        @Nullable
        private InputStream openAsset(String assetPath) {
            try {
                return assets.open(assetPath);
            } catch (IOException ignored) {
                return null;
            }
        }

        private boolean hasFileExtension(String path) {
            int lastSlash = path.lastIndexOf('/');
            int lastDot = path.lastIndexOf('.');
            return lastDot > lastSlash;
        }

        private String getMimeType(String path) {
            String lower = path.toLowerCase(Locale.US);
            if (lower.endsWith(".html")) return "text/html";
            if (lower.endsWith(".js") || lower.endsWith(".mjs")) return "application/javascript";
            if (lower.endsWith(".css")) return "text/css";
            if (lower.endsWith(".json")) return "application/json";
            if (lower.endsWith(".webmanifest")) return "application/manifest+json";
            if (lower.endsWith(".svg")) return "image/svg+xml";
            if (lower.endsWith(".png")) return "image/png";
            if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
            if (lower.endsWith(".webp")) return "image/webp";
            if (lower.endsWith(".woff2")) return "font/woff2";
            if (lower.endsWith(".woff")) return "font/woff";
            if (lower.endsWith(".ttf")) return "font/ttf";
            if (lower.endsWith(".ico")) return "image/x-icon";
            if (lower.endsWith(".mp3")) return "audio/mpeg";
            return "application/octet-stream";
        }
    }

    @SuppressWarnings("deprecation")
    @Override
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
