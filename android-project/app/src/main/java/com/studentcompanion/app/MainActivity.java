package com.studentcompanion.app;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.text.TextUtils;
import android.webkit.CookieManager;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    private static final String APP_URL = "https://ais-pre-2gu2b762mx2v4rebuyqej3-245109150484.europe-west2.run.app";
    private WebView webView;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        webView = new WebView(this);
        webView.setBackgroundColor(Color.parseColor("#0B1526"));
        setContentView(webView);

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);
        settings.setMediaPlaybackRequiresUserGesture(false);
        settings.setUseWideViewPort(true);
        settings.setLoadWithOverviewMode(true);

        CookieManager.getInstance().setAcceptCookie(true);
        CookieManager.getInstance().setAcceptThirdPartyCookies(webView, true);

        webView.setWebChromeClient(new WebChromeClient());
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                Uri uri = request.getUrl();
                String host = uri.getHost();
                if (host != null && (host.contains("run.app") || host.contains("paystack") || host.contains("firebaseapp.com"))) {
                    return false;
                }
                try {
                    startActivity(new Intent(Intent.ACTION_VIEW, uri));
                    return true;
                } catch (Exception ignored) {
                    return false;
                }
            }

            @Override
            public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
                if (request != null && request.isForMainFrame()) {
                    showBrandedErrorScreen(
                        view,
                        "CONNECTION OFFLINE",
                        "Unable to connect right now",
                        "Check your mobile data or Wi-Fi connection and tap Retry to reload Student Companion."
                    );
                }
            }

            @Override
            public void onReceivedHttpError(WebView view, WebResourceRequest request, WebResourceResponse errorResponse) {
                if (request != null && request.isForMainFrame() && errorResponse != null && errorResponse.getStatusCode() >= 400) {
                    int statusCode = errorResponse.getStatusCode();
                    String detail = statusCode == 404
                        ? "The app server returned HTTP 404. Please confirm the hosted Student Companion deployment is published and live, then tap Retry."
                        : "The server responded with HTTP " + statusCode + ". Please wait a moment and tap Retry.";
                    showBrandedErrorScreen(
                        view,
                        "HTTP " + statusCode,
                        "Student Companion unavailable",
                        detail
                    );
                }
            }
        });

        webView.loadUrl(APP_URL);
    }

    private void showBrandedErrorScreen(WebView view, String badgeText, String headline, String detail) {
        String safeBadge = TextUtils.htmlEncode(badgeText);
        String safeHeadline = TextUtils.htmlEncode(headline);
        String safeDetail = TextUtils.htmlEncode(detail);
        String offlineHtml = "<!DOCTYPE html><html><head><meta name='viewport' content='width=device-width,initial-scale=1'/></head>"
            + "<body style='margin:0;background:#0B1526;color:#F8FAFC;font-family:-apple-system,BlinkMacSystemFont,sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;text-align:center;padding:24px;box-sizing:border-box;'>"
            + "<div style='max-width:340px;width:100%;background:#132238;border:1px solid #1E3352;border-radius:18px;padding:28px 22px;box-sizing:border-box;'>"
            + "<div style='display:inline-block;padding:5px 12px;border-radius:999px;background:#261F10;border:1px solid #F59E0B;color:#FBBF24;font-size:11px;font-weight:700;letter-spacing:0.06em;margin-bottom:14px;'>" + safeBadge + "</div>"
            + "<h2 style='color:#84E000;margin:0 0 8px 0;font-size:20px;font-weight:800;'>Student Companion</h2>"
            + "<p style='color:#F8FAFC;font-size:15px;font-weight:600;margin:0 0 8px 0;'>" + safeHeadline + "</p>"
            + "<p style='color:#CBD5E1;font-size:13px;line-height:1.5;margin:0 0 20px 0;'>" + safeDetail + "</p>"
            + "<button onclick=\"window.location.replace('" + APP_URL + "')\" style='width:100%;min-height:48px;padding:12px 24px;border-radius:12px;border:none;background:#84E000;color:#0B1526;font-weight:800;font-size:15px;cursor:pointer;'>Retry</button>"
            + "</div>"
            + "</body></html>";
        view.loadDataWithBaseURL(null, offlineHtml, "text/html", "UTF-8", null);
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
